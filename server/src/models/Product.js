const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  printify_variant_id: Number,
  title: String,
  price: Number,
  stock: { type: Number, default: 0 },
  is_available: { type: Boolean, default: true }
});

const productSchema = new mongoose.Schema(
  {
    printify_product_id: { type: String, unique: true },
    title: String,
    description: String,
    image_url: String,
    is_active: { type: Boolean, default: true },
    variants: [variantSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
