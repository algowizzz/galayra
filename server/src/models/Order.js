const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  variant_id: Number,
  title: String,
  price: Number,
  quantity: Number
})

const orderSchema = new mongoose.Schema(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    items: [orderItemSchema],
    total_amount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "sent_to_printify",
        "in_production",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    },
    printify_order_id: String
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)
