const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  variant_id: String,
  title: String,
  price: Number,
  quantity: Number,
  image_url: String
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },
  items: [cartItemSchema]
});

module.exports = mongoose.model("Cart", cartSchema);
