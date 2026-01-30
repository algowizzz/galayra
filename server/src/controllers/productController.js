const db = require("../config/db");

exports.createProduct = (req, res) => {
  const { title, description, price } = req.body;
  const userId = req.user.id;

  if (!title || !price) {
    return res.status(400).json({ message: "Title and price are required" });
  }

  const sql =
    "INSERT INTO products (user_id, title, description, price) VALUES (?, ?, ?, ?)";

  db.query(sql, [userId, title, description, price], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.status(201).json({ message: "Product created successfully" });
  });
};

exports.getMyProducts = (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM products WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching products" });
    }
    res.json(result);
  });
};

exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching products" });
    }
    res.json(result);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result[0]);
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const sql = "DELETE FROM products WHERE id = ? AND user_id = ?";

  db.query(sql, [id, userId], (err, result) => {
    if (err || result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const userId = req.user.id;

  const sql = `
    UPDATE products 
    SET title = ?, description = ?, price = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [title, description, price, id, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating product" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({ message: "Product updated successfully" });
  });
};
