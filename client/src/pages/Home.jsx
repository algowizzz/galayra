import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Hero from "../components/Hero"
import HomeProducts from "../components/HomeProducts"
import Categories from "../components/Categories"
import About from "../components/About"
import Features from "../components/Features"
import Reviews from "../components/Reviews"
import Newsletter from "../components/Newsletter"

export default function Home() {
  const aboutRef = useRef(null)
  const footerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

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
      <Categories />
      <HomeProducts />
      <Features />
      <Reviews />
      <Newsletter />
      <About ref={aboutRef} />
    </>
  )
}
