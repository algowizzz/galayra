import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Bestsellers from "../components/BestSeller";
import img1 from "../assets/img1.png";

export default function Home() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(stored);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Protect Your <span>Vibe</span>
          </h1>
          <p className="hero-subtitle">
            Premium phone cases designed to make a statement. Express yourself with stunning designs and unmatched protection.
          </p>
          <button className="cta-btn" onClick={() => navigate("/products")}>
            Shop Collection →
          </button>
        </div>
        <div className="hero-visual">
          <img src={img1} alt="Hero" className="hero-image" />
        </div>
      </section>

      <section className="categories">
        <div className="section-header">
          <h2 className="section-title">Browse by Style</h2>
          <p className="section-subtitle">
            Find the perfect case that matches your vibe
          </p>
        </div>
        <div className="categories-grid">
          {["🎨","⚪","🌿","✨"].map((icon,i)=>(
            <div key={i} className="category-card" onClick={()=>navigate("/products")}>
              <div className="category-icon">{icon}</div>
              <div className="category-name">
                {["Colorful","Minimal","Nature","Sparkle"][i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Bestsellers />

      <section className="why-us">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Quality you can feel, style you can see
          </p>
        </div>
        <div className="features-grid">
          {[
            ["🛡️","Premium Protection","Military-grade drop protection"],
            ["🎨","Unique Designs","Exclusive artist collaborations"],
            ["🌱","Eco-Friendly","Sustainable materials"],
            ["💝","Lifetime Warranty","We stand behind our products"]
          ].map((f,i)=>(
            <div key={i} className="feature-card">
              <div className="feature-icon">{f[0]}</div>
              <div className="feature-title">{f[1]}</div>
              <div className="feature-desc">{f[2]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Join thousands of happy customers
          </p>
        </div>
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to share your experience!</p>
            <button
              className="cta-btn"
              onClick={() => navigate("/reviews")}
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div className="reviews-scroll">
                {reviews.slice(0, 6).map((r) => (
                  <div key={r._id} className="review-card">
                    <div className="review-stars">
                      {"⭐".repeat(r.rating)}
                    </div>
                    <p className="review-text">"{r.review}"</p>
                    <div className="review-author">
                      <div className="author-avatar">👤</div>
                      <div className="author-name">{r.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="newsletter">
        <div className="newsletter-content">
          <h2 className="section-title">Stay in the Loop</h2>
          <p className="section-subtitle">
            Subscribe for exclusive deals and new arrivals
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e)=>{
              e.preventDefault();
              alert("Subscribed successfully!");
            }}
          >
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              required
            />
            <button className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}