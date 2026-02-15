import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">GALAYRA</div>
          <p className="footer-desc">
            Premium phone cases designed to protect your device and express your style.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/products">All Cases</Link></li>
            <li><Link to="/products">iPhone</Link></li>
            <li><Link to="/products">Samsung</Link></li>
            <li><Link to="/products">Google Pixel</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a>Contact Us</a></li>
            <li><a>FAQs</a></li>
            <li><a>Shipping</a></li>
            <li><a>Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><a>Careers</a></li>
            <li><a>Press</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2024 GALAYRA. All rights reserved.
      </div>
    </footer>
  );
}
