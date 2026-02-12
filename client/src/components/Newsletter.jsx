import "../styles/main.css"

export default function Newsletter() {
  const handleSubmit = e => {
    e.preventDefault()
    e.target.querySelector("button").innerText = "Subscribed! 🎉"
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-wrapper">
        <div className="newsletter-blob top-right" />
        <div className="newsletter-blob bottom-left" />

        <span className="newsletter-icon">💌</span>

        <h2 className="newsletter-title">
          Join the Case Club
        </h2>

        <p className="newsletter-subtitle">
          Get exclusive deals, new releases, and 15% off your first order!
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">
            Subscribe ✨
          </button>
        </form>

      </div>
    </section>
  )
}
