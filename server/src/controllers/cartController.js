const db = require("../config/db");

exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { variant_id, quantity = 1 } = req.body;

  if (!variant_id) {
    return res.status(400).json({ message: "Variant ID required" });
  }

  const checkSql =
    "SELECT * FROM cart WHERE user_id = ? AND variant_id = ?";

  db.query(checkSql, [userId, variant_id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length > 0) {
      db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE id = ?",
        [quantity, result[0].id],
        () => res.json({ message: "Cart updated" })
      );
    } else {
      db.query(
        "INSERT INTO cart (user_id, variant_id, quantity) VALUES (?, ?, ?)",
        [userId, variant_id, quantity],
        () => res.status(201).json({ message: "Added to cart" })
      );
    }
  });
};

exports.getMyCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      c.id,
      p.title,
      v.title AS variant,
      v.price,
      c.quantity
    FROM cart c
    JOIN product_variants v ON c.variant_id = v.id
    JOIN products p ON v.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching cart" });
    }
    res.json(rows);
  });
};

exports.updateCartItem = (req, res) => {
  const userId = req.user.id;
  const { quantity } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
    [quantity, id, userId],
    (err, result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json({ message: "Cart updated" });
    }
  );
};

exports.removeFromCart = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    "DELETE FROM cart WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json({ message: "Removed from cart" });
    }
  );
};
