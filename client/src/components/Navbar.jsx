import { FaSearch, FaUser, FaShoppingBag } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import "../styles/main.css"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const { setIsCartOpen, cartItems } = useCart()

  const goToShop = () => {
    navigate("/products");
  }

  const goToAbout = () => {
    navigate("/", { state: { scrollTo: "about" } })
  }

  const goToContact = () => {
    navigate("/", { state: { scrollTo: "footer" } })
  }

  return (
    <>
      <div className="top-strip">
        Free shipping on orders over $75. <span>Subscribe</span>
      </div>

      <nav className="navbar">
        <div className="nav-left">
          <FaSearch className="nav-icon" />
        </div>

        <div className="nav-center">
          <h1 className="logo">GALAYRA</h1>
          <div className="nav-links">
            <button onClick={goToShop} className="nav-btn">Shop</button>
            <button onClick={goToAbout} className="nav-btn">About</button>
            <button onClick={goToContact} className="nav-btn">Contact</button>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-account">
            <FaUser />
            <Link to="/login">Log In</Link>
          </div>
          <div className="nav-cart" onClick={() => setIsCartOpen(true)}>
            <FaShoppingBag />
            <span>Cart ({cartCount})</span>
          </div>
        </div>
      </nav>
    </>
  )
}
