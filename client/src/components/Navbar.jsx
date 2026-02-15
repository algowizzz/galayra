import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return null;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={() => navigate("/")}>
        GALAYRA
      </div>

      <ul className="nav-links">
        <li><Link className="nav-link" to="/products">Shop</Link></li>
        <li><Link className="nav-link" to="/about">About</Link></li>
        <li><Link className="nav-link" to="/reviews">Reviews</Link></li>
      </ul>

      <div className="nav-actions">
        {user ? (
          <div className="avatar-wrapper" ref={dropdownRef}>
            <div
              className="profile-icon"
              onClick={() => setOpen(!open)}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#FFFCD1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {open && (
              <div className="profile-dropdown">

                <div className="dropdown-user">
                  <div className="dropdown-name">{user.name}</div>
                  <div className="dropdown-email">{user.email}</div>
                </div>

                <div className="dropdown-divider" />

                <button onClick={() => { navigate("/profile"); setOpen(false); }}>
                  My Profile
                </button>

                <button onClick={() => { navigate("/orders"); setOpen(false); }}>
                  Orders
                </button>

                <button onClick={() => { navigate("/wishlist"); setOpen(false); }}>
                  Wishlist
                </button>

                <button onClick={() => { navigate("/settings"); setOpen(false); }}>
                  Settings
                </button>

                <div className="dropdown-divider" />

                <button
                  className="logout-btn"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

      </div>
    </nav>
  );
}
