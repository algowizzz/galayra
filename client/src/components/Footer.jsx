import { forwardRef } from "react"
import { Link } from "react-router-dom"
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa"
import "../styles/main.css"

export default forwardRef(function Footer(_, ref) {
  return (
    <footer ref={ref} className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Shop</h4>
          <p>All</p>
          <p><Link to="/products">Shop</Link></p>
          <p><Link>About</Link></p>
          <p><Link>Contact</Link></p>
        </div>

        <div className="footer-col">
          <h4>Helpful Links</h4>
          <p>FAQ</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Shipping Policy</p>
          <p>Refund Policy</p>
          <p>Cookie Policy</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>galayra.business@gmail.com</p>

          <div className="socials">
            <FaInstagram />
            <FaFacebookF />
            <FaPinterestP />
          </div>
        </div>

        <div className="footer-col footer-subscribe">
          <h4>Subscribe</h4>
          <p className="subscribe-text">
            Subscribe to our newsletter and be among the first to hear about
            new arrivals, events and special offers.
          </p>

          <label>Email *</label>
          <input type="email" />

          <div className="checkbox-row">
            <input type="checkbox" />
            <span>Yes, subscribe me to your newsletter.</span>
          </div>

          <button className="subscribe-btn">Subscribe</button>

          <p className="copyright">
            © 2035 by GALAYRA
          </p>
        </div>
      </div>

      <div className="footer-brand">GALAYRA</div>
    </footer>
  );
});
