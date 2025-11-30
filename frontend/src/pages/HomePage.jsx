import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="full-screen">
      {/* Header */}
      <header className="bg-yellow-400 text-black py-4">
        <div className="container header-content">
          <h1 className="text-2xl font-bold">Shukuma</h1>
          <nav className="flex gap-6">
            <Link to="/signin" className="nav-link hover:underline">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary bg-black text-white px-4 py-2 rounded">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 py-20 hero">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 hero-title">Body-Weight Fitness, Reimagined</h2>
          <p className="text-xl text-gray-600 mb-8 hero-subtitle">52-Card Deck System. Zero Equipment Needed.</p>
          <Link
            to="/signup"
            className="bg-yellow-400 text-black px-8 py-3 rounded font-bold text-lg btn btn-primary btn-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
