import { FaSearch, FaShoppingBag } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import "../styles/style.css"
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
  const goToShop = () => navigate("/products")
  const goToAbout = () => navigate("/", { state: { scrollTo: "features" } })
  const goToContact = () => navigate("/", { state: { scrollTo: "reviews" } })

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
      <nav className="cc-navbar">
        <div className="cc-navbar-inner">
          <div className="cc-nav-left">
            <h1 className="cc-brand" onClick={() => navigate("/")}>
              GALAYRA
            </h1>
          </div>

          <div className="cc-nav-center">
            <span onClick={goToShop}>Shop</span>
            <span onClick={goToAbout}>Features</span>
            <span onClick={goToContact}>Reviews</span>
          </div>

          <div className="cc-nav-right">
            <FaSearch
              className="cc-nav-icon"
              onClick={() => setSearchOpen(true)}
            />

            <div className="cc-cart" onClick={() => setIsCartOpen(true)}>
              <FaShoppingBag />
              <span className="cc-cart-badge">{cartCount}</span>
            </div>

            {user ? (
              <div className="cc-account" ref={accountRef}>
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="profile"
                  onClick={() => setAccountOpen(p => !p)}
                />

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
              <Link to="/login" className="cc-login">Log In</Link>
            )}
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
