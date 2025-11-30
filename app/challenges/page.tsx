"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"

const CHALLENGES = [
  {
    id: 1,
    name: "7-Day Streak",
    description: "Complete a workout every day for a week",
    progress: 5,
    total: 7,
    reward: "🏆 Gold Badge",
    status: "in-progress",
  },
  {
    id: 2,
    name: "Push-up Master",
    description: "Complete 100 push-ups total",
    progress: 75,
    total: 100,
    reward: "⭐ 50 XP",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Weekly Warrior",
    description: "Complete 5 workouts this week",
    progress: 3,
    total: 5,
    reward: "🎯 Active Badge",
    status: "in-progress",
  },
  {
    id: 4,
    name: "Speed Runner",
    description: "Complete 3 workouts in under 15 minutes",
    progress: 2,
    total: 3,
    reward: "⚡ Lightning Badge",
    status: "in-progress",
  },
]

export default function ChallengesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

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
        <h1 className="text-4xl font-bold mb-2">Challenges & Goals</h1>
        <p className="text-gray-600 mb-8">Complete challenges to earn rewards and maintain motivation</p>

        <div className="grid md:grid-cols-2 gap-6">
          {CHALLENGES.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{challenge.name}</h3>
                  <p className="text-gray-600 text-sm">{challenge.description}</p>
                </div>
                <span className="text-2xl">{challenge.reward}</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-bold">
                    {challenge.progress} / {challenge.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                    style={{
                      width: `${(challenge.progress / challenge.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Challenge</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
