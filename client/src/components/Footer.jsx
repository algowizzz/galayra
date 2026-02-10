import { forwardRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import "../styles/style.css"

export default forwardRef(function Footer(_, ref) {
  const navigate = useNavigate()

  return (
    <footer className="site-footer" ref={ref}>
      <div className="footer-top">
        <div className="footer-brand-col">
          <h3>GALAYRA</h3>
          <p>
            Premium phone cases for every vibe. Express yourself, protect your phone.
          </p>

          <div className="footer-socials">
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/products">All Cases</Link>
          <Link to="/products">iPhone Cases</Link>
          <Link to="/products">Samsung Cases</Link>
          <Link to="/products">Custom Cases</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <span>FAQ</span>
          <span>Shipping</span>
          <span>Returns</span>
          <span onClick={() => navigate("/", { state: { scrollTo: "footer" } })}>
            Contact Us
          </span>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <span>About Us</span>
          <span>Sustainability</span>
          <span>Careers</span>
          <span>Press</span>
        </div>

      </div>

      <div className="footer-divider" />
      <div className="footer-bottom">
        <p>© 2024 Case Collective. All rights reserved.</p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>

    </footer>
  )
})
