"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface WorkoutTimerProps {
  workout: {
    name: string
    duration: number
    reps?: number
  }
  onComplete: () => void
}

export default function WorkoutTimer({ workout, onComplete }: WorkoutTimerProps) {
  const router = useRouter()
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const maxTime = workout.duration * 60

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && time < maxTime) {
      interval = setInterval(() => setTime((t) => t + 1), 1000)
    } else if (time >= maxTime) {
      setIsRunning(false)
      setCompleted(true)
    }
    return () => clearInterval(interval)
  }, [isRunning, time, maxTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (completed) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-4xl font-bold mb-2">Great Work!</h2>
        <p className="text-lg text-gray-600 mb-2">You completed {workout.name}</p>
        <p className="text-gray-600 mb-8">Time: {formatTime(time)}</p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Back to Dashboard
          </Button>
          <Button onClick={() => router.push("/browse")} variant="outline">
            Find Another Workout
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-12 shadow-sm border border-border text-center">
      <h2 className="text-3xl font-bold mb-2">{workout.name}</h2>

      <div className="my-12">
        <div className="text-8xl font-bold text-primary mb-4">{formatTime(time)}</div>
        <p className="text-gray-600">{time < maxTime ? `${formatTime(maxTime - time)} remaining` : "Time's up!"}</p>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
        >
          {isRunning ? "PAUSE" : "START"}
        </Button>
        <Button
          onClick={() => {
            setTime(0)
            setIsRunning(false)
          }}
          size="lg"
          variant="outline"
        >
          RESET
        </Button>
      </div>
    </div>
  )
}
