import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import HomeProducts from "../components/HomeProducts";
import Categories from "../components/Categories";
import About from "../components/About";

export default function Home() {
  const aboutRef = useRef(null);
  const footerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo === "about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    if (location.state?.scrollTo === "footer") {
      document
        .getElementById("footer")
        ?.scrollIntoView({ behavior: "smooth" })
    }

    if (location.state?.scrollTo) {
      navigate("/", { replace: true })
    }
  }, [location, navigate])

  return (
    <>
      <Hero />
      <HomeProducts />
      <Categories />
      <About ref={aboutRef} />
    </>
  );
}
