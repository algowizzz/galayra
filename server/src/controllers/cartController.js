const db = require("../config/db");

exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  if (!product_id) {
    return res.status(400).json({ message: "Product ID required" });
  }

  const qty = quantity || 1;

  const checkSql =
    "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";

  db.query(checkSql, [userId, product_id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length > 0) {
      const updateSql =
        "UPDATE cart SET quantity = quantity + ? WHERE id = ?";

      db.query(updateSql, [qty, result[0].id], () => {
        res.json({ message: "Cart updated" });
      });
    } else {
      const insertSql =
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";

      db.query(insertSql, [userId, product_id, qty], () => {
        res.status(201).json({ message: "Added to cart" });
      });
    }
  });
};

exports.getMyCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT c.id, p.title, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching cart" });
    }
    res.json(result);
  });
};

exports.updateCartItem = (req, res) => {
  const userId = req.user.id;
  const { quantity } = req.body;
  const { id } = req.params;

  const sql =
    "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?";

  db.query(sql, [quantity, id, userId], (err, result) => {
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Cart item updated" });
  });
};

exports.removeFromCart = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql =
    "DELETE FROM cart WHERE id = ? AND user_id = ?";

  db.query(sql, [id, userId], (err, result) => {
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed from cart" });
  });
};
