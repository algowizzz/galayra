import "../styles/main.css"

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="reviews-header">
        <h2>Happy Vibes Only</h2>
        <p>What our customers are saying ✨</p>
      </div>

      <div className="reviews-grid">
        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p className="review-text">
            "Obsessed with my new case! The colors are even better in person and
            it's survived SO many drops. 10/10 would recommend!"
          </p>

          <div className="review-user">
            <div className="avatar green">S</div>
            <div>
              <strong>Sarah M.</strong>
              <span>Verified Buyer</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p className="review-text">
            "Finally found a case that's cute AND protective. I've gotten so many
            compliments. Buying more for my whole family!"
          </p>

          <div className="review-user">
            <div className="avatar cream">J</div>
            <div>
              <strong>Jessica T.</strong>
              <span>Verified Buyer</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p className="review-text">
            "The quality is insane for the price. Slim fit, grippy texture, and
            it looks absolutely stunning. Already ordered my second one!"
          </p>

          <div className="review-user">
            <div className="avatar green">M</div>
            <div>
              <strong>Mike R.</strong>
              <span>Verified Buyer</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
