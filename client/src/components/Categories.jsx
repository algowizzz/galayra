import { Link } from "react-router-dom";
import "../styles/main.css";
import bannerImg from "../assets/one.png";

export default function Categories() {
  return (
    <section className="sale-wrapper">
      <svg className="wave top-wave" viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path
          fill="#ffffff"
          d="M0,40 C120,60 240,20 360,30 480,40 600,80 720,70 840,60 960,20 1080,30 1200,40 1320,70 1440,50 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="sale-banner">
        <div className="sale-content">
          <h2>
            Catch Our End of <br /> Season Sale
          </h2>
          <Link to="/products" className="sale-btn">Shop Now</Link>
        </div>

        <div className="sale-image">
          <img src={bannerImg} alt="Season Sale" />
        </div>
      </div>

      <svg className="wave bottom-wave" viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path
          fill="#ffffff"
          d="M0,20 C120,40 240,80 360,70 480,60 600,20 720,30 840,40 960,80 1080,70 1200,60 1320,30 1440,40 L1440,90 L0,90 Z"
        />
      </svg>
    </section>
  );
}
