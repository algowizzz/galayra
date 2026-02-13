import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
// import Checkout from "./pages/Checkout";
// import Reviews from "./pages/Reviews";
import About from "./pages/About";
// import Success from "./pages/Success";

export default function App() {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/")

  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || "/")
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  const navigate = (p) => (window.location.hash = p)

  let Page = <Home navigate={navigate} />
  if (path === "/products") Page = <Products navigate={navigate} />
  else if (path.startsWith("/product/"))
    Page = <ProductDetail navigate={navigate} id={path.split("/")[2]} />
  else if (path === "/login") Page = <Login navigate={navigate} />
  else if (path === "/signup") Page = <Signup navigate={navigate} />
  else if (path === "/profile") Page = <Profile navigate={navigate} />
  else if (path === "/checkout") Page = <Checkout navigate={navigate} />
  else if (path === "/reviews") Page = <Reviews navigate={navigate} />
  else if (path === "/about") Page = <About navigate={navigate} />
  else if (path === "/success") Page = <Success navigate={navigate} />

  return (
    <>
      <Navbar navigate={navigate} />
      {Page}
      <Footer />
    </>
  );
}
