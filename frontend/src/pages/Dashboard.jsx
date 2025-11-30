"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProgressTracker from "../components/ProgressTracker"
import ChallengesWidget from "../components/ChallengesWidget"
import { progressAPI, challengeAPI } from "../lib/api"

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"))
  const [stats, setStats] = useState(null)
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const statsResponse = await progressAPI.getStats()
      const challengesResponse = await challengeAPI.getActive()
      setStats(statsResponse.data)
      setChallenges(challengesResponse.data.challenges)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="text-3xl text-bold mb-8">Welcome back, {user.firstName}!</h1>

        <ProgressTracker stats={stats} />

        <section style={{ marginTop: "3rem" }}>
          <h2 className="text-2xl text-bold mb-6">Active Challenges</h2>
          <ChallengesWidget challenges={challenges} />
        </section>

        <section
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <Link
            to="/workout/random"
            className="btn btn-primary btn-lg"
            style={{ padding: "2rem", textAlign: "center", fontSize: "1.25rem" }}
          >
            Start Random Workout
          </Link>
          <Link
            to="/browse"
            className="btn btn-info btn-lg"
            style={{ padding: "2rem", textAlign: "center", fontSize: "1.25rem" }}
          >
            Browse Exercises
          </Link>
          <Link
            to="/challenges"
            className="btn btn-danger btn-lg"
            style={{ padding: "2rem", textAlign: "center", fontSize: "1.25rem" }}
          >
            View Challenges
          </Link>
          <Link
            to="/progress"
            className="btn btn-success btn-lg"
            style={{ padding: "2rem", textAlign: "center", fontSize: "1.25rem" }}
          >
            Track Progress
          </Link>
        </section>
      </div>
    </div>
  )
}
