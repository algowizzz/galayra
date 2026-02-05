import { useState } from "react"
import api from "../api/axios"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await api.post("/users/login", { email, password })
    localStorage.setItem("token", res.data.token)
    navigate("/")
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
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
