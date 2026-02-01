import { forwardRef } from "react";

export default forwardRef(function Footer(props, ref) {
  return (
    <footer ref={ref} id="contact" className="site-footer">
      <div className="footer-inner">

        <div className="footer-top">
          <div className="footer-col">
            <h4>Shipping & Returns</h4>
            <p>Store Policy</p>
            <p>Payment Methods</p>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>Tel: 123-456-7890</p>
            <p className="link">info@mysite.com</p>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Pinterest</p>
          </div>
        </div>

        <div className="footer-newsletter">
          <p>Join our mailing list and never miss an update</p>

          <div className="newsletter-row">
            <input type="email" placeholder="Email *" />
            <button>Subscribe Now</button>
          </div>

          <div className="checkbox">
            <input type="checkbox" />
            <span>Yes, subscribe me to your newsletter.</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2035 by GALAYRA
      </div>
    </footer>
  );
});
