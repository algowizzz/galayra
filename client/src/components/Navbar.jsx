import { FaSearch, FaShoppingBag } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import "../styles/main.css"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import SearchOverlay from "./SearchOverlay"

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [products, setProducts] = useState([])

  const accountRef = useRef(null)

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  useEffect(() => {
    const handleClickOutside = e => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const goToShop = () => navigate("/products")
  const goToAbout = () => navigate("/", { state: { scrollTo: "about" } })
  const goToContact = () => navigate("/", { state: { scrollTo: "footer" } })

  return (
    <>
      <div className="top-strip">
        Free shipping on orders over $75. <span>Subscribe</span>
      </div>

      <nav className="navbar">
        <div className="nav-left">
          <FaSearch
            className="nav-icon"
            onClick={() => setSearchOpen(true)}
          />
        </div>

        <div className="nav-center">
          <h1 className="logo" onClick={() => navigate("/")}>GALAYRA</h1>
          <div className="nav-links">
            <button onClick={goToShop} className="nav-btn">Shop</button>
            <button onClick={goToAbout} className="nav-btn">About</button>
            <button onClick={goToContact} className="nav-btn">Contact</button>
          </div>
        </div>

        <div className="nav-right">
          {user ? (
            <div className="account-wrapper" ref={accountRef}>
              <div
                className="account-trigger"
                onClick={() => setAccountOpen(prev => !prev)}
              >
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="profile"
                  className="nav-avatar"
                />
                <span className="account-name">{user.name}</span>
              </div>

              {accountOpen && (
                <div className="account-dropdown">
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/profile")
                      setAccountOpen(false)
                    }}
                  >
                    My Profile
                  </div>

                  <div className="dropdown-item">Orders</div>
                  <div className="dropdown-item">Wishlist</div>
                  <div className="dropdown-item">Notifications</div>

                  <div className="dropdown-divider" />

                  <div
                    className="dropdown-item logout"
                    onClick={() => {
                      logout()
                      setAccountOpen(false)
                      navigate("/")
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-account">
              <Link to="/login">Log In</Link>
            </div>
          )}

          <div className="nav-cart" onClick={() => setIsCartOpen(true)}>
            <FaShoppingBag />
            <span>Cart ({cartCount})</span>
          </div>
        </div>
      </nav>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
      />
    </>
  )
}
