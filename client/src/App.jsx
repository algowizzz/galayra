import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/main.css";

export default function App() {
    return (
        <div className="page">
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </div>
    );
}
