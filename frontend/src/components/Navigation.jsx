"use client"

import { Link, useNavigate } from "react-router-dom"

export default function Navigation() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/signin")
  }

  return (
    <nav>
      <div className="container nav-container">
        <Link to="/dashboard" className="nav-logo">
          Shukuma
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/workout/random" className="nav-link">
              Random Workout
            </Link>
          </li>
          <li>
            <Link to="/browse" className="nav-link">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/progress" className="nav-link">
              Progress
            </Link>
          </li>
          <li>
            <Link to="/challenges" className="nav-link">
              Challenges
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
