import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

import signupImage from "../assets/symbol-logo.png";

// ✅ Use API_BASE at the top
const API_BASE = process.env.NODE_ENV === "production"
  ? "https://shukumaapp-backend.onrender.com" // deployed backend
  : "http://localhost:5000"; // local dev backend

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // ✅ Use API_BASE here
      const response = await axios.post(`${API_BASE}/api/auth/signup`, formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")
    } catch (error) {
      alert(error.response?.data?.error || "Sign up failed")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome to Shukuma</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="form-control"
            />
          </div>
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
            SIGN UP
          </button>
        </form>
        <p className="text-center mt-4">
          Already have a profile?{" "}
          <Link to="/signin" style={{ color: "#0000FF" }}>
            Sign in
          </Link>
        </p>
      </div>
      <div className="auth-image">
        <img src={signupImage} alt="login image" />
      </div>
    </div>
  )
}

