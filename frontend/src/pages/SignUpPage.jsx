"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

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
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData)
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
    </div>
  )
}
