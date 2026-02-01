import { useState } from "react";
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
          I'm a paragraph. Click here to add your own text and edit me.
          It’s easy. Just click “Edit Text” or double click me to add your
          own content and make changes to the font.
        </p>

        <button className="hero-btn">Shop Now</button>
      </div>

      <div className="hero-right">
        <img src={images[index]} alt="Hero" />
      </div>
    </section>
  );
}
