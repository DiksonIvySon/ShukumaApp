"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import ProgressTracker from "@/components/progress-tracker"
import ChallengesWidget from "@/components/challenges-widget"
import QuickStats from "@/components/quick-stats"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [workoutStreak, setWorkoutStreak] = useState(7)
  const [totalWorkouts, setTotalWorkouts] = useState(34)

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-600">Let's keep your fitness journey going strong</p>
        </div>

        {/* Quick Stats */}
        <QuickStats workoutStreak={workoutStreak} totalWorkouts={totalWorkouts} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-primary-foreground">
              <h2 className="text-2xl font-bold mb-4">Ready for today's workout?</h2>
              <p className="mb-6 text-primary-foreground/90">Get a randomized workout or browse by your preferences</p>
              <div className="flex gap-4">
                <Link href="/workout/random">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Get Random Workout
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  >
                    Browse Workouts
                  </Button>
                </Link>
              </div>
            </div>

            {/* Progress Tracker */}
            <ProgressTracker />
          </div>

          {/* Right Column */}
          <div>
            {/* Challenges */}
            <ChallengesWidget />
          </div>
        </div>
      </main>
    </div>
  )
}
