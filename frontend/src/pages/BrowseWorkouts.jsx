"use client"

import { useState, useEffect } from "react"
import WorkoutCard from "../components/WorkoutCard"
import { workoutAPI } from "../lib/api"

export default function BrowseWorkouts() {
  const [workouts, setWorkouts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [difficulty, setDifficulty] = useState("all")
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWorkouts()
  }, [])

  useEffect(() => {
    filterWorkouts()
  }, [workouts, difficulty, category])

  const loadWorkouts = async () => {
    try {
      const response = await workoutAPI.getAllCards()
      setWorkouts(response.data.cards)
    } catch (error) {
      console.error("Failed to load workouts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterWorkouts = () => {
    let result = workouts
    if (difficulty !== "all") {
      result = result.filter((w) => w.difficulty === difficulty)
    }
    if (category !== "all") {
      result = result.filter((w) => w.category === category)
    }
    setFiltered(result)
  }

  if (loading) return <div className="text-center py-8">Loading workouts...</div>

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="text-3xl text-bold mb-8">Browse Exercises</h1>

        <div className="card mb-8">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-control">
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control">
                <option value="all">All Categories</option>
                <option value="Core">Core</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Cardio">Cardio</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-3">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  )
}
