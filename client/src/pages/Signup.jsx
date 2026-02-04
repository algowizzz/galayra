import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/users/register", {
      name,
      email,
      password
    })
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={e => setName(e.target.value)} />
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button>Sign up</button>
    </form>
  )
}
