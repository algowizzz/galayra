const Cart = require("../models/Cart");

exports.getMyCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) cart = await Cart.create({ user: req.userId, items: [] });

  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { product_id, variant_id, title, price, image_url, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) cart = await Cart.create({ user: req.userId, items: [] });

  const existing = cart.items.find(i => i.variant_id === String(variant_id));

  if (existing) existing.quantity += quantity;
  else cart.items.push({ product_id, variant_id, title, price, image_url, quantity });

  await cart.save();
  res.json(cart);
};

exports.updateQuantity = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = req.body.quantity;
  await cart.save();

  res.json(cart);
};

exports.removeItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
  await cart.save();

  res.json(cart);
};
