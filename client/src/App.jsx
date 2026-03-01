import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/SignIn";
import Signup from "./pages/Signup";
import OAuthSuccess from "./pages/OAuthSuccess";
import Profile from "./pages/Profile";
import ProfileOrders from "./pages/ProfileOrders";
import ProfileWishlist from "./pages/ProfileWishlist";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileAddresses from "./pages/ProfileAddresses";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/orders' element={<ProfileOrders />} />
        <Route path='/wishlist' element={<ProfileWishlist />} />
        <Route path='/settings' element={<ProfileSettings />} />
        <Route path='/address' element={<ProfileAddresses />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
