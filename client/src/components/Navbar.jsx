import { FaSearch, FaUser, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar({ onContact, onAbout }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div
                    className="brand-name"
                    onClick={() => window.location.href = "/"}
                    >
                    GALAYRA
                </div>
                <div className="brand-sub">Your Cases</div>
            </div>

            <div className="navbar-center">
                <Link to="/products" className="nav-link-btn">
                    Shop
                </Link>
                <button className="nav-link-btn" onClick={onAbout}>
                    About
                </button>
                <button className="nav-link-btn" onClick={onContact}>
                Contact
                </button>
            </div>

            <div className="navbar-right">
                <div className="search-box">
                <FaSearch className="icon" />
                <input type="text" placeholder="Search" />
                </div>

                <div className="account">
                <FaUser className="icon" />
                <span onClick={() => window.location.href = "/login"}>Log In</span>
                </div>

                <FaShoppingBag className="cart" />
            </div>
        </nav>
    );
}
