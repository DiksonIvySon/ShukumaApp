"use client"

import { useState, useEffect } from "react"
import { progressAPI } from "../lib/api"

export default function ProgressPage() {
  const [stats, setStats] = useState(null)
  const [weeklyStats, setWeeklyStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgressData()
  }, [])

  const loadProgressData = async () => {
    try {
      const statsResponse = await progressAPI.getStats()
      const weeklyResponse = await progressAPI.getWeekly()
      setStats(statsResponse.data)
      setWeeklyStats(weeklyResponse.data.weeklyStats)
    } catch (error) {
      console.error("Failed to load progress data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading progress...</div>

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="text-3xl text-bold mb-8">Progress Tracker</h1>

        <div className="stats-grid mb-8">
          <div className="stat-card">
            <p className="stat-label">Total Workouts</p>
            <p className="stat-value">{stats?.workoutsCompleted || 0}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Current Streak</p>
            <p className="stat-value" style={{ color: "#dc2626" }}>
              {stats?.currentStreak || 0}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Longest Streak</p>
            <p className="stat-value" style={{ color: "#2563eb" }}>
              {stats?.longestStreak || 0}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Minutes</p>
            <p className="stat-value" style={{ color: "#16a34a" }}>
              {stats?.totalMinutes || 0}
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl text-bold mb-4">Weekly Activity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {weeklyStats?.map((day, idx) => (
              <div key={idx} className="flex gap-4" style={{ alignItems: "center" }}>
                <span style={{ width: "80px", fontSize: "0.875rem" }}>{day.date}</span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: `${(day.workoutCount / 5) * 100}%` }} />
                </div>
                <span style={{ width: "80px", textAlign: "right", fontSize: "0.875rem" }}>
                  {day.workoutCount} workouts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
