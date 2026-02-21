import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function normalizeUser(data) {
  return {
    id: data._id,
    name: data.name || "User",
    email: data.email || "",
    avatar: data.avatar || null,
    dateOfBirth: data.dateOfBirth || "",
    phone: data.phone || "",
    gender: data.gender || ""
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const res = await api.get("/users/me")
        setUser(normalizeUser(res.data))
      } catch {
        localStorage.removeItem("token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  const login = async (email, password) => {
    try {
      const res = await api.post("/users/login", { email, password })
      localStorage.setItem("token", res.data.token)
      const me = await api.get("/users/me")
      setUser(normalizeUser(me.data))
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed"
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const res = await api.post("/users/register", { name, email, password })
      if (!res.data?.token) {
        return {
          success: false,
          message: res.data?.message || "Signup failed"
        }
      }
      localStorage.setItem("token", res.data.token)
      const me = await api.get("/users/me")
      setUser(normalizeUser(me.data))
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed"
      }
    }
  }

  const updateProfile = async (data) => {
    try {
      const res = await api.put("/users/profile", data);
      setUser(prev => ({
        ...prev,
        ...res.data
      }));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Update failed"
      }
    }
  }

  const googleLogin = async (token) => {
    try {
      localStorage.setItem("token", token)
      const res = await api.get("/users/me")
      setUser(normalizeUser(res.data))
      return { success: true }
    } catch {
      return { success: false, message: "Google login failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    window.location.href = "/"
  }
  if (loading) return null
  return (
    <AuthContext.Provider value={{ user, login, signup, googleLogin, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
