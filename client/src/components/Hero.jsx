import { useState } from "react";
import { Link } from "react-router-dom";
import one from "../assets/one.png";

export default function Hero() {
  const images = [one];
  const [index] = useState(0);

  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          The Gift of <br /> Good Style
        </h1>

        <p>
          Designed for everyday expression, Galayra brings together style, protection, and 
          quality. Explore phone cases that feel personal, look elegant, and fit seamlessly 
          into your lifestyle.
        </p>

        <Link to="/products" className="hero-btn">Shop Now</Link>
      </div>

      <div className="hero-right">
        <img src={images[index]} alt="Hero" />
      </div>
    </section>
  );
}
