export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About GALAYRA</h1>
        <p>
          Crafting premium phone cases that combine style, protection, and sustainability
        </p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, GALAYRA started with a simple mission: to create phone cases that are as beautiful as they are protective. 
            We believe your phone case should reflect your personality while keeping your device safe. 
            That's why we partner with independent artists and designers to bring unique, limited-edition designs to our customers.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="about-grid">
            <div className="about-value">
              <div className="about-value-icon">🎨</div>
              <div className="about-value-title">Creativity</div>
              <div className="about-value-desc">
                We celebrate artistic expression and support independent creators
              </div>
            </div>
            <div className="about-value">
              <div className="about-value-icon">🌍</div>
              <div className="about-value-title">Sustainability</div>
              <div className="about-value-desc">
                Eco-friendly materials and sustainable production practices
              </div>
            </div>
            <div className="about-value">
              <div className="about-value-icon">💎</div>
              <div className="about-value-title">Quality</div>
              <div className="about-value-desc">
                Premium craftsmanship and rigorous quality control standards
              </div>
            </div>
          </div>
        </div>
        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <p>
            Every GALAYRA case is carefully crafted with premium materials to provide superior protection without compromising on style. 
            We stand behind our products with a lifetime warranty and offer exceptional customer service. 
            Our diverse collection features designs from talented artists around the world, ensuring you'll find something that perfectly matches your vibe.
          </p>
        </div>
      </div>
    </div>
  );
}
