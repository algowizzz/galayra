const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

const {
  getReviews,
  addReview,
  deleteReview
} = require("../controllers/reviewController");

router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});
router.get("/:productId", getReviews);
router.post("/", addReview);
router.delete("/:id", deleteReview);

module.exports = router;