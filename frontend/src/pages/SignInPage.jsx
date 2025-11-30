import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

// ✅ Put this at the top of your file
const API_BASE = process.env.NODE_ENV === "production"
  ? "https://shukumaapp-backend.onrender.com" // deployed backend URL
  : "http://localhost:5000"; // local dev backend

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Use the API_BASE here
      const response = await axios.post(`${API_BASE}/api/auth/signin`, formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")
    } catch (error) {
      alert(error.response?.data?.error || "Sign in failed")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome back to Shukuma</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            SIGN IN
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have a profile?{" "}
          <Link to="/signup" style={{ color: "#2563eb" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
