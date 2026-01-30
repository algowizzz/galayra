const db = require("../config/db");

exports.placeOrder = (req, res) => {
  const userId = req.user.id;

  const cartSql = `
    SELECT 
      c.variant_id,
      c.quantity,
      v.price
    FROM cart c
    JOIN product_variants v ON c.variant_id = v.id
    WHERE c.user_id = ?
  `;

  db.query(cartSql, [userId], (err, cartItems) => {
    if (err || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cartItems.forEach(i => {
      total += i.price * i.quantity;
    });

    db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, total],
      (err, orderResult) => {
        if (err) {
          return res.status(500).json({ message: "Order failed" });
        }

        const orderId = orderResult.insertId;

        const items = cartItems.map(i => [
          orderId,
          i.variant_id,
          i.quantity,
          i.price
        ]);

        db.query(
          "INSERT INTO order_items (order_id, variant_id, quantity, price) VALUES ?",
          [items],
          () => {
            db.query(
              "DELETE FROM cart WHERE user_id = ?",
              [userId],
              () =>
                res.status(201).json({
                  message: "Order placed",
                  order_id: orderId,
                  total
                })
            );
          }
        );
      }
    );
  });
};
