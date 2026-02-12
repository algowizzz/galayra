import "../styles/main.css"

export default function Features() {
  return (
    <section className="features">
      <div className="feature-circle left" />
      <div className="feature-circle center" />
      <div className="feature-circle right" />

      <div className="features-header">
        <h2>Why Choose Us?</h2>
        <p>More than just a pretty case 💪</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Military-Grade Protection</h3>
          <p>
            Drop-tested from 10ft. Your phone stays safe through every adventure.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>Eco-Friendly Materials</h3>
          <p>
            Made from sustainable materials. Good for your phone, great for the planet.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✏️</div>
          <h3>Custom Designs</h3>
          <p>
            Create your own unique case. Express yourself with custom artwork.
          </p>
        </div>

      </div>
    </section>
  )
}
