const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getMyCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);

module.exports = router;
