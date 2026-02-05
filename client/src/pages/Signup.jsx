import { useState } from "react"
import api from "../api/axios"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post("/users/register", { name, email, password })
    navigate("/login")
  }

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/auth/google"
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign up</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignup}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            borderRadius: "999px",
            marginBottom: "30px"
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style={{ width: 18, height: 18 }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  )
}
