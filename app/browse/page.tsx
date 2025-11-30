"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import WorkoutCard from "@/components/workout-card"

const SAMPLE_WORKOUTS = [
  { id: 1, name: "Push-ups Challenge", duration: 15, level: "beginner", category: "strength", reps: 20 },
  { id: 2, name: "Squats Master", duration: 20, level: "intermediate", category: "strength", reps: 30 },
  { id: 3, name: "Morning Cardio", duration: 25, level: "beginner", category: "cardio", reps: 0 },
  { id: 4, name: "Plank Hold", duration: 10, level: "beginner", category: "strength", reps: 1 },
  { id: 5, name: "Burpee Blast", duration: 30, level: "advanced", category: "cardio", reps: 15 },
  { id: 6, name: "Yoga Flow", duration: 20, level: "beginner", category: "flexibility", reps: 0 },
  { id: 7, name: "Jumping Jacks Frenzy", duration: 15, level: "intermediate", category: "cardio", reps: 50 },
  { id: 8, name: "Core Crusher", duration: 25, level: "intermediate", category: "strength", reps: 25 },
]

export default function Browse() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [filters, setFilters] = useState({
    level: "all",
    duration: "all",
    category: "all",
  })
  const [filteredWorkouts, setFilteredWorkouts] = useState(SAMPLE_WORKOUTS)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  useEffect(() => {
    let filtered = SAMPLE_WORKOUTS

    if (filters.level !== "all") {
      filtered = filtered.filter((w) => w.level === filters.level)
    }
    if (filters.category !== "all") {
      filtered = filtered.filter((w) => w.category === filters.category)
    }
    if (filters.duration !== "all") {
      const dur = Number.parseInt(filters.duration)
      filtered = filtered.filter((w) => w.duration <= dur)
    }

    setFilteredWorkouts(filtered)
  }, [filters])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <h1 className="text-4xl font-bold mb-2">Browse Workouts</h1>
        <p className="text-gray-600 mb-8">Find the perfect workout for your fitness level and goals</p>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-border">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Fitness Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg"
              >
                <option value="all">Any Duration</option>
                <option value="15">Up to 15 min</option>
                <option value="20">Up to 20 min</option>
                <option value="30">Up to 30 min</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No workouts match your filters</p>
            <Button onClick={() => setFilters({ level: "all", duration: "all", category: "all" })} variant="outline">
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
