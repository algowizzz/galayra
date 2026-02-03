const Cart = require("../models/Cart")

exports.addToCart = async (req, res) => {
  const userId = req.user.id
  const { product, variant_id, quantity } = req.body

  let cart = await Cart.findOne({ user_id: userId })

  if (!cart) {
    cart = await Cart.create({
      user_id: userId,
      items: []
    })
  }

  const existing = cart.items.find(
    i => i.variant_id === variant_id
  )

  if (existing) {
    existing.quantity += quantity
  } else {
    cart.items.push({ ...product, variant_id, quantity })
  }

  await cart.save()
  res.json(cart)
}

exports.getMyCart = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.id })
  res.json(cart || { items: [] })
}

exports.updateCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.id })

  const item = cart.items.id(req.params.id)
  item.quantity = req.body.quantity

  await cart.save()
  res.json(cart)
}

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.id })
  cart.items.id(req.params.id).remove()
  await cart.save()
  res.json(cart)
}
