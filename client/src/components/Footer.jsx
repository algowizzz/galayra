import { forwardRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa"
import "../styles/main.css"

export default forwardRef(function Footer(_, ref) {
  const navigate = useNavigate()

  const goToAbout = () => {
    navigate("/", { state: { scrollTo: "about" } })
  }

  const goToContact = () => {
    navigate("/", { state: { scrollTo: "footer" } })
  }

  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Shop</h4>
          <p><Link to="/products">Shop</Link></p>
          <p><button className="footer-link" onClick={goToAbout}>About</button></p>
          <p><button className="footer-link" onClick={goToContact}>Contact</button></p>
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
          <p>+91 9647824567</p>
          <p>galayra.business@gmail.com</p>

          <div className="socials">
            <FaInstagram onClick={"https://www.instagram.com/galayra.in/"}/>
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

          <p className="copyright">© 2035 by GALAYRA</p>
        </div>
      </div>

      <div className="footer-brand">GALAYRA</div>
    </footer>
  )
})
