import Bestsellers from "../components/BestSeller";

export default function Home({ navigate }) {
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
            Shop Collection <span>→</span>
          </button>
        </div>

        <div className="hero-visual">
          <div className="floating-phones">
            <div className="phone-mockup">🌸</div>
            <div className="phone-mockup">🌊</div>
            <div className="phone-mockup">✨</div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="section-header">
          <h2 className="section-title">Browse by Style</h2>
          <p className="section-subtitle">Find the perfect case that matches your vibe</p>
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

      <Bestsellers navigate={navigate}/>

      <section className="why-us">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">Quality you can feel, style you can see</p>
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

      <section className="newsletter">
        <div className="newsletter-content">
          <h2 className="section-title">Stay in the Loop</h2>
          <p className="section-subtitle">Subscribe for exclusive deals and new arrivals</p>

          <form className="newsletter-form">
            <input type="email" className="newsletter-input" placeholder="Enter your email"/>
            <button className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
