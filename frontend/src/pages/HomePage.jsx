import { Link } from "react-router-dom"
import "../styles/HomePage.css" // Import the CSS file

import logo from "../assets/white-logo.png";
import groupImage from "../assets/Group-image.jpg";
import challenge1 from "../assets/challenge1.png";
import challenge2 from "../assets/challenge2.png";
import challenge3 from "../assets/challenge3.png";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container">
          <img src={logo} alt="Shukuma logo" width={150}/>
          <nav className="nav">
            <Link to="/signin" className="nav-link btn-primary">Sign In</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h2>Let's Exercise Together</h2>
            <p>
              Get randomized workout challenges, track your progress, and achieve your fitness goals with zero equipment needed.
            </p>
            <Link to="/signup" className="btn btn-hero">Get Started Free</Link>
          </div>
          <div className="hero-image">
            <img
              src={groupImage}
              alt="Fitness workout"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container features-grid">
          <div className="feature-card">
            <img className="feature-image" src={challenge1} alt="image" />
            <h3>Randomized Workouts</h3>
            <p>Shuffle the deck and get a surprise workout every day to stay engaged and motivated.</p>
          </div>
          <div className="feature-card">
            <img className="feature-image" src={challenge2} alt="image" />
            <h3>Progress Tracking</h3>
            <p>Log your workouts, track streaks, monitor improvements, and reach new personal records.</p>
          </div>
          <div className="feature-card">
            <img className="feature-image" src={challenge3} alt="image" />
            <h3>Daily Challenges</h3>
            <p>Complete daily and weekly challenges to earn achievements and maintain consistency.</p>
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="more-features">
        <div className="container more-features-grid">
          <div className="feature-card">
            <h3>Customizable Workouts</h3>
            <p>Filter by fitness level, duration, or goal type. Tailor your workout to your needs.</p>
            <ol>
              <li>Fitness level selection</li>
              <li>Workout duration options</li>
              <li>Goal-based filtering</li>
            </ol>
          </div>
          <div className="feature-card">
            <h3>Clear Instructions</h3>
            <p>Step-by-step guides with visual demonstrations for safe, correct form.</p>
            <ol>
              <li>Video tutorials</li>
              <li>Exercise illustrations</li>
              <li>Safety tips</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p>© 2025 Shukuma. All rights reserved. Zero equipment needed.</p>
        </div>
      </footer>
    </div>
  )
}


