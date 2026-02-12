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

  return (
    <>
      {/* Top Strip */}
      <div className="cc-top-strip">
        Free shipping on orders over $75. <span>Subscribe</span>
      </div>

      {/* Navbar */}
      <nav className="cc-navbar">
        <div className="cc-navbar-inner">

          {/* Left */}
          <div className="cc-nav-left">
            <button
              className="cc-icon-btn"
              onClick={() => setSearchOpen(true)}
            >
              <FaSearch />
            </button>
          </div>

          {/* Center */}
          <div className="cc-nav-center">
            <h1 className="cc-logo" onClick={() => navigate("/")}>
              Case Collective
            </h1>

            <div className="cc-nav-links">
              <button onClick={() => navigate("/products")}>Shop</button>
              <button onClick={() => navigate("/")}>Features</button>
              <button onClick={() => navigate("/")}>Reviews</button>
            </div>
          </div>

          {/* Right */}
          <div className="cc-nav-right">
            {user ? (
              <div className="cc-account" ref={accountRef}>
                <button
                  className="cc-account-trigger"
                  onClick={() => setAccountOpen(p => !p)}
                >
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="profile"
                  />
                  <span>{user.name}</span>
                </button>

                {accountOpen && (
                  <div className="cc-account-dropdown">
                    <div onClick={() => navigate("/profile")}>My Profile</div>
                    <div>Orders</div>
                    <div>Wishlist</div>
                    <div className="divider" />
                    <div
                      className="logout"
                      onClick={() => {
                        logout()
                        navigate("/")
                      }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="cc-login">
                Log In
              </Link>
            )}

            <button
              className="cc-cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingBag />
              {cartCount > 0 && (
                <span className="cc-cart-badge">{cartCount}</span>
              )}
            </button>
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
