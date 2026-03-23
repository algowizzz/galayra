import { useState, useEffect } from "react";
import { FiStar } from "react-icons/fi";

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState(0)

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reviews")
      if (!res.ok) {
        console.error("Server error")
        return
      }
      const data = await res.json()
      setReviews(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching reviews:", err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !text || rating === 0) return
    try {
      await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          review: text,
          rating
        })
      })
      setName("")
      setText("")
      setRating(0)
      fetchReviews()
    } catch (err) {
      console.error("Error submitting review:", err)
    }
  }

  const deleteReview = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: "DELETE"
      });
      fetchReviews()
    } catch (err) {
      console.error("Error deleting review:", err)
    }
  }

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>Customer Reviews</h1>
        <p>See what users are saying</p>
      </div>
      <div className="reviews-content">
        <div className="reviews-grid-two">
          <div className="reviews-form-section">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your experience..."
                  rows="4"
                  required
                />
              </div>
              <div className="rating-input">
                {[1,2,3,4,5].map((star) => (
                  <FiStar
                    key={star}
                    size={26}
                    className={`star-icon ${rating >= star ? "active" : ""}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="submit-review-btn"
                disabled={!name || !text || rating === 0}
              >Submit Review</button>
            </form>
          </div>
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="no-reviews">No reviews yet</div>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="review-item">
                  <div className="review-header">
                    <div className="review-author-info">
                      <div className="review-item-avatar">👤</div>
                      <div>
                        <div className="review-item-name">{r.name}</div>
                        <div className="review-item-date">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="review-rating">
                      {"⭐".repeat(r.rating)}
                    </div>
                  </div>
                  <div className="review-item-text">
                    {r.review}
                  </div>
                  <button
                    onClick={() => deleteReview(r._id)}
                    className="delete-review-btn"
                  >Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
