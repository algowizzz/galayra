const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  deleteProduct,
  updateProduct
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/my/products", authMiddleware, getMyProducts);
router.post("/", authMiddleware, createProduct);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
