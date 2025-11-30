"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"

export default function ProgressPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats] = useState({
    totalWorkouts: 34,
    streak: 7,
    calories: 2145,
    personalRecords: [
      { exercise: "Push-ups", record: 45 },
      { exercise: "Squats", record: 60 },
      { exercise: "Plank Hold", record: "2:30" },
    ],
    weeklyProgress: [
      { day: "Mon", workouts: 2 },
      { day: "Tue", workouts: 1 },
      { day: "Wed", workouts: 2 },
      { day: "Thu", workouts: 0 },
      { day: "Fri", workouts: 2 },
      { day: "Sat", workouts: 3 },
      { day: "Sun", workouts: 1 },
    ],
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-600 mb-8">Track your fitness journey and achievements</p>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm">Total Workouts</p>
            <p className="text-4xl font-bold text-primary">{stats.totalWorkouts}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm">Current Streak</p>
            <p className="text-4xl font-bold text-secondary">{stats.streak} days</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm">Calories Burned</p>
            <p className="text-4xl font-bold text-accent">{stats.calories}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm">This Week</p>
            <p className="text-4xl font-bold">11</p>
          </div>
        </div>

        {/* Personal Records */}
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-6">Personal Records</h2>
          <div className="space-y-4">
            {stats.personalRecords.map((pr, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{pr.exercise}</span>
                <span className="text-lg font-bold text-primary">{pr.record}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Weekly Activity</h2>
          <div className="flex items-end gap-4 h-48">
            {stats.weeklyProgress.map((day, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg mb-2"
                  style={{ height: `${(day.workouts / 3) * 100}%` }}
                />
                <span className="text-sm text-gray-600">{day.day}</span>
                <span className="text-xs text-gray-400">{day.workouts}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
