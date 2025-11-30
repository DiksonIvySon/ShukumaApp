"use client"

import { useState, useEffect } from "react"
import { challengeAPI } from "../lib/api"

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChallenges()
  }, [])

  const loadChallenges = async () => {
    try {
      const activeResponse = await challengeAPI.getActive()
      const achievementsResponse = await challengeAPI.getAchievements()
      setChallenges(activeResponse.data.challenges)
      setAchievements(achievementsResponse.data.achievements)
    } catch (error) {
      console.error("Failed to load challenges:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading challenges...</div>

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="text-3xl text-bold mb-8">Challenges & Achievements</h1>

        <section style={{ marginBottom: "3rem" }}>
          <h2 className="text-2xl text-bold mb-6">Active Challenges</h2>
          <div className="challenges-list">
            {challenges?.map((challenge) => (
              <div key={challenge.id} className="challenge-card">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{challenge.name}</h3>
                <p className="text-gray" style={{ marginBottom: "1rem" }}>
                  {challenge.description}
                </p>
                <div className="challenge-progress">
                  <div
                    className="challenge-progress-fill"
                    style={{ width: `${(challenge.currentCount / challenge.targetCount) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray">
                  {challenge.currentCount} / {challenge.targetCount}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl text-bold mb-6">Achievements</h2>
          <div className="grid grid-2">
            {achievements?.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  background: "linear-gradient(to bottom right, #FCD34D, #FFC107)",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>🏆</p>
                <h3 style={{ fontWeight: "bold", fontSize: "1.125rem" }}>{achievement.name}</h3>
                <p style={{ fontSize: "0.875rem", color: "#374151" }}>Completed {achievement.currentCount} times</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
