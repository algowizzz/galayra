const Cart = require("../models/Cart")

const getUserId = req => req.user?.id || "guest"

exports.addToCart = async (req, res) => {
  const userId = getUserId(req)

  const {
    product_id,
    variant_id,
    title,
    price,
    image_url,
    quantity = 1
  } = req.body

  let cart = await Cart.findOne({ user_id: userId })

  if (!cart) {
    cart = await Cart.create({
      user_id: userId,
      items: []
    })
  }

  const existing = cart.items.find(
    i => i.variant_id === String(variant_id)
  )

  if (existing) {
    existing.quantity += quantity
  } else {
    cart.items.push({
      product_id,
      variant_id: String(variant_id),
      title,
      price,
      image_url,
      quantity
    })
  }

  await cart.save()
  res.json(cart)
}

exports.getMyCart = async (req, res) => {
  const userId = getUserId(req)

  const cart = await Cart.findOne({ user_id: userId })
  res.json(cart || { items: [] })
}

exports.updateCartItem = async (req, res) => {
  const userId = getUserId(req)

  const cart = await Cart.findOne({ user_id: userId })
  if (!cart) return res.json({ items: [] })

  const item = cart.items.id(req.params.id)
  if (!item) return res.status(404).json({ message: "Item not found" })

  item.quantity = req.body.quantity
  await cart.save()

  res.json(cart)
}

exports.removeFromCart = async (req, res) => {
  const userId = getUserId(req)

  const cart = await Cart.findOne({ user_id: userId })
  if (!cart) return res.json({ items: [] })

  cart.items = cart.items.filter(
    item => item._id.toString() !== req.params.id
  )

  await cart.save()
  res.json(cart)
}
