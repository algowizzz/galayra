const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  variant_id: mongoose.Schema.Types.ObjectId,
  title: String,
  price: Number,
  quantity: Number,
  image_url: String
});

const cartSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  items: [cartItemSchema]
});

module.exports = mongoose.model("Cart", cartSchema);
