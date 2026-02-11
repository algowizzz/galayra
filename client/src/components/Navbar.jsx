import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/galayra.css";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        GALAYRA
      </div>

      <div className="nav-links">
        <a onClick={() => navigate("/products")}>Shop</a>
        <a onClick={() => navigate("/")}>About</a>
        <a onClick={() => navigate("/")}>Reviews</a>
      </div>

      <div className="nav-actions">
        {user ? (
          <div onClick={() => navigate("/profile")}>
            {user.name}
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}

        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
