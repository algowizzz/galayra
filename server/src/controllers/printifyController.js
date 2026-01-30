const db = require("../config/db");
const axios = require("axios");

const printify = axios.create({
  baseURL: "https://api.printify.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
    "Content-Type": "application/json"
  }
});

exports.syncProducts = async (req, res) => {
  try {
    const shopId = process.env.PRINTIFY_SHOP_ID;

    const response = await printify.get(`/shops/${shopId}/products.json`);
    const products = response.data.data;

    for (const p of products) {
      const existing = await new Promise((resolve, reject) => {
        db.query(
          "SELECT id FROM products WHERE printify_product_id = ?",
          [p.id],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows[0]);
          }
        );
      });

      let productId;

      if (existing) {
        productId = existing.id;

        await new Promise((resolve, reject) => {
          db.query(
            "UPDATE products SET title=?, description=?, image_url=? WHERE id=?",
            [p.title, p.description, p.images?.[0]?.src || null, productId],
            err => (err ? reject(err) : resolve())
          );
        });

        await new Promise((resolve, reject) => {
          db.query(
            "DELETE FROM product_variants WHERE product_id=?",
            [productId],
            err => (err ? reject(err) : resolve())
          );
        });
      } else {
        const result = await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO products 
             (printify_product_id, title, description, image_url) 
             VALUES (?, ?, ?, ?)`,
            [p.id, p.title, p.description, p.images?.[0]?.src || null],
            (err, res) => (err ? reject(err) : resolve(res))
          );
        });

        productId = result.insertId;
      }

      const enabledVariants = p.variants.filter(v => v.is_enabled);

      for (const v of enabledVariants) {
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO product_variants 
             (product_id, printify_variant_id, title, price)
             VALUES (?, ?, ?, ?)`,
            [
              productId,
              v.id,
              v.title,
              (v.price / 100).toFixed(2)
            ],
            err => (err ? reject(err) : resolve())
          );
        });
      }
    }

    res.json({ message: "Printify products synced successfully" });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Printify sync failed" });
  }
};
