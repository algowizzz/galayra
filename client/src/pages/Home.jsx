import { useRef } from "react";
import Navbar from "../components/Navbar";

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

      <main className="content">
      </main>
    </div>
  );
}
