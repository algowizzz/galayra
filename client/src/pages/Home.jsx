import { useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeProducts from "../components/HomeProducts";
import About from "../components/About";

export default function Home() {
  const footerRef = useRef(null);
  const aboutRef = useRef(null);

  return (
    <div className="page">
        <Navbar
            onContact={() =>
                footerRef.current.scrollIntoView({ behavior: "smooth" })
            }
            onAbout={() =>
                aboutRef.current.scrollIntoView({ behavior: "smooth" })
            }
        />

        <Hero />
        <HomeProducts />
        <Categories />
        <About />

        <Footer ref={footerRef} />
      <main className="content">
      </main>
    </div>
  );
}
