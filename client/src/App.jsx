import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ScrollToTop from "./components/ScrollTop"
import CartDrawer from "./components/CartDrawer"

import "./styles/main.css";

export default function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
