const Product = require("../models/Product")

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_active: true })

    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error fetching products" })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      is_active: true
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" })
  }
}
