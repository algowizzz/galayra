const db = require("../config/db");

exports.getProducts = (req, res) => {
  const sql = `
    SELECT 
      p.id AS product_id,
      p.title,
      p.description,
      p.image_url,
      v.id AS variant_id,
      v.title AS variant_title,
      v.price
    FROM products p
    JOIN product_variants v ON p.id = v.product_id
    WHERE p.is_active = true
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching products" });
    }

    const products = {};
    rows.forEach(row => {
      if (!products[row.product_id]) {
        products[row.product_id] = {
          id: row.product_id,
          title: row.title,
          description: row.description,
          image_url: row.image_url,
          variants: []
        };
      }

      products[row.product_id].variants.push({
        id: row.variant_id,
        title: row.variant_title,
        price: row.price
      });
    });

    res.json(Object.values(products));
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      p.id AS product_id,
      p.title,
      p.description,
      p.image_url,
      v.id AS variant_id,
      v.title AS variant_title,
      v.price
    FROM products p
    JOIN product_variants v ON p.id = v.product_id
    WHERE p.id = ? AND p.is_active = true
  `;

  db.query(sql, [id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = {
      id: rows[0].product_id,
      title: rows[0].title,
      description: rows[0].description,
      image_url: rows[0].image_url,
      variants: []
    };

    rows.forEach(row => {
      product.variants.push({
        id: row.variant_id,
        title: row.variant_title,
        price: row.price
      });
    });

    res.json(product);
  });
};
