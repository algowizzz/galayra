import "../styles/main.css"

export default function Categories() {
  return (
    <section className="vibe-section">

      <div className="vibe-header">
        <h2>Shop by Vibe</h2>
        <p>Find the case that speaks to your soul ✨</p>
      </div>

      <div className="vibe-grid">

        <div className="vibe-card">
          <div className="vibe-icon">🌈</div>
          <h3>Colorful</h3>
          <span>24 Cases</span>
        </div>

        <div className="vibe-card">
          <div className="vibe-icon">🖤</div>
          <h3>Minimal</h3>
          <span>18 Cases</span>
        </div>

        <div className="vibe-card">
          <div className="vibe-icon">🌿</div>
          <h3>Nature</h3>
          <span>31 Cases</span>
        </div>

        <div className="vibe-card">
          <div className="vibe-icon">✨</div>
          <h3>Sparkle</h3>
          <span>27 Cases</span>
        </div>

      </div>
    </section>
  )
}
