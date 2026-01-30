const db = require("../config/db");

exports.placeOrder = (req, res) => {
  const userId = req.user.id;

  const cartSql = `
    SELECT c.product_id, c.quantity, p.price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(cartSql, [userId], (err, cartItems) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching cart" });
    }

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });

    const orderSql =
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";

    db.query(orderSql, [userId, total], (err, orderResult) => {
      if (err) {
        return res.status(500).json({ message: "Order creation failed" });
      }

      const orderId = orderResult.insertId;

      const orderItemsSql =
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";

      const orderItemsData = cartItems.map(item => [
        orderId,
        item.product_id,
        item.quantity,
        item.price
      ]);

      db.query(orderItemsSql, [orderItemsData], err => {
        if (err) {
          return res.status(500).json({ message: "Order items failed" });
        }

        db.query(
          "DELETE FROM cart WHERE user_id = ?",
          [userId],
          err => {
            if (err) {
              return res.status(500).json({ message: "Cart clear failed" });
            }

            res.status(201).json({
              message: "Order placed successfully",
              order_id: orderId,
              total
            });
          }
        );
      });
    });
  });
};
