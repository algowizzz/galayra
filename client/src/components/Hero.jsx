import { Link } from "react-router-dom"
import "../styles/main.css"
import heroImg from "../assets/one.png"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          The Gift of <br /> Good Style
        </h1>

        <p>
          I'm a paragraph. Click here to add your own text and edit me.
          It’s easy. Just click “Edit Text” or double click me to add
          your own content and make changes to the font.
        </p>

        <Link to="/products" className="hero-btn">
          Shop Now
        </Link>
      </div>

      <div className="hero-right">
        <img src={heroImg} alt="Hero" />
      </div>
    </section>
  )
}
