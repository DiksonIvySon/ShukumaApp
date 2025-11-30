"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ChallengesWidget() {
  const challenges = [
    { name: "7-Day Streak", progress: 71 },
    { name: "Push-up Master", progress: 75 },
    { name: "Weekly Warrior", progress: 60 },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
      <h2 className="text-xl font-bold mb-6">Active Challenges</h2>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <div key={challenge.name}>
            <p className="text-sm font-medium mb-2">{challenge.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{challenge.progress}% complete</p>
          </div>
        ))}
      </div>

      <Link href="/challenges">
        <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          View All Challenges
        </Button>
      </Link>
    </div>
  )
}
