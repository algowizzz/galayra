import { Link } from "react-router-dom"
import "../styles/newstyles.css"
// import "../styles/newstyles.css"

export default function Hero() {
  return (
    <section className="cc-hero">
      <div className="cc-dots-bg"></div>
      <div className="cc-yellow-blob"></div>
      <div className="cc-hero-inner">
        <div className="cc-hero-left">
          <span className="cc-pill">
            ✨ New Collection 2024
          </span>

          <h1>
            <span className="cc-gradient">Protect</span><br />
            <span className="cc-dark">Your Vibe</span>
          </h1>

          <p>
            Premium phone cases that match your energy.
            Bold designs, unbeatable protection, and seriously good vibes only.
          </p>

          <div className="cc-hero-actions">
            <Link to="/products" className="cc-btn-primary">
              Shop Collection →
            </Link>

            <button className="cc-btn-secondary">
              See Designs
            </button>
          </div>

          <div className="cc-trust">
            <div>
              <strong>50K+</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Rating</span>
            </div>
            <div>
              <strong>🌿</strong>
              <span>Eco-Friendly</span>
            </div>
          </div>
        </div>

        <div className="cc-hero-right">
          <div className="cc-phone phone-1">
            <span>🌸</span>
            <p>Blossom</p>
          </div>

          <div className="cc-phone phone-2">
            <span>🌊</span>
            <p>Wave</p>
          </div>

          <div className="cc-phone phone-3">
            <span>⭐</span>
            <p>Star</p>
          </div>
        </div>

      </div>
    </section>
  )
}
