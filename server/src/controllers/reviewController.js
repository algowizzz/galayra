const Review = require("../models/Review");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    if (!name || !rating || !review) {
      return res.status(400).json({ message: "All fields required" });
    }
    const newReview = new Review({
      name,
      rating,
      review
    });
    await newReview.save();
    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
