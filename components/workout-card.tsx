"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface WorkoutCardProps {
  workout: {
    id: number
    name: string
    duration: number
    level: string
    category: string
    reps?: number
  }
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-pink-300 h-48 flex items-center justify-center">
        <img
          src={`/.jpg?height=200&width=300&query=${workout.name} exercise illustration`}
          alt={workout.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{workout.name}</h3>

        <div className="flex gap-2 mb-4 text-sm">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{workout.level}</span>
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">{workout.category}</span>
        </div>

        <div className="flex justify-between text-gray-600 mb-4 text-sm">
          <span>⏱️ {workout.duration} min</span>
          {workout.reps && <span>🎯 {workout.reps} reps</span>}
        </div>

        <Link href={`/workout/${workout.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Workout</Button>
        </Link>
      </div>
    </div>
  )
}
