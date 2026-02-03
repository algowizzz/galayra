const Order = require("../models/Order")
const Cart = require("../models/Cart")

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.id })
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart empty" })
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  const order = await Order.create({
    user_id: req.user.id,
    items: cart.items,
    total_amount: total
  })

  cart.items = []
  await cart.save()

  res.status(201).json(order)
}
