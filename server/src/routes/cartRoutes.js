const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  getMyCart,
  addToCart,
  updateQuantity,
  removeItem
} = require("../controllers/cartController");

router.use(authMiddleware);

router.get("/", getMyCart);
router.post("/", addToCart);
router.put("/:itemId", updateQuantity);
router.delete("/:itemId", removeItem);

module.exports = router;
