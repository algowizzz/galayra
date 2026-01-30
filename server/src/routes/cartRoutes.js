const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart
} = require("../controllers/cartController");

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getMyCart);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;
