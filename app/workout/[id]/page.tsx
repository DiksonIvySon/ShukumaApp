"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import WorkoutTimer from "@/components/workout-timer"

const WORKOUT_DETAILS: Record<string, any> = {
  "1": {
    id: 1,
    name: "Push-ups Challenge",
    duration: 15,
    level: "beginner",
    category: "strength",
    reps: 20,
    description: "Build upper body strength with classic push-ups",
    instructions: [
      "Start in a plank position with hands shoulder-width apart",
      "Lower your body until your chest nearly touches the ground",
      "Push back up to the starting position",
      "Repeat for desired number of reps",
    ],
  },
}

export default function WorkoutPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [user, setUser] = useState<any>(null)
  const [workout, setWorkout] = useState<any>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
    } else {
      setUser(JSON.parse(userData))
      const workoutData = WORKOUT_DETAILS[id] || WORKOUT_DETAILS["1"]
      setWorkout(workoutData)
    }
  }, [id, router])

  if (!user || !workout) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        {!started ? (
          <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-6">
              ← Back
            </Button>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-border mb-8">
              <h1 className="text-4xl font-bold mb-2">{workout.name}</h1>
              <div className="flex gap-4 mb-6 text-gray-600">
                <span>⏱️ {workout.duration} min</span>
                <span>📊 {workout.level}</span>
                <span>🎯 {workout.category}</span>
              </div>

              <p className="text-lg mb-8">{workout.description}</p>

              <div className="bg-accent/10 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <ol className="space-y-3">
                  {workout.instructions.map((instruction: string, i: number) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-bold text-primary">{i + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-secondary/10 rounded-lg p-6 mb-8">
                <h3 className="font-bold mb-2">Target Reps: {workout.reps || "N/A"}</h3>
                <p className="text-gray-600">Complete the recommended reps with proper form</p>
              </div>

              <Button
                size="lg"
                onClick={() => setStarted(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg w-full md:w-auto"
              >
                START WORKOUT
              </Button>
            </div>
          </div>
        ) : (
          <WorkoutTimer workout={workout} onComplete={() => setStarted(false)} />
        )}
      </main>
    </div>
  )
}
