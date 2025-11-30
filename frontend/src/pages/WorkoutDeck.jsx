"use client"

import { useState, useEffect } from "react"
import FlipCard from "../components/FlipCard"
import VideoPlayer from "../components/VideoPlayer"
import WorkoutTimer from "../components/WorkoutTimer"
import NavigationBar from "../components/Navigation"
import { workoutAPI } from "../lib/api"

export default function WorkoutDeck() {
  const [currentCard, setCurrentCard] = useState(null)
  const [deck, setDeck] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false)

  useEffect(() => {
    loadDeck()
  }, [])

  const loadDeck = async () => {
    try {
      const response = await workoutAPI.getAllCards()
      const shuffled = response.data.cards.sort(() => Math.random() - 0.5)
      setDeck(shuffled)
      setCurrentCard(shuffled[0])
      setCurrentIndex(0)
    } catch (error) {
      console.error("Failed to load cards:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextCard = () => {
    if (currentIndex < deck.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setCurrentCard(deck[newIndex])
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setCurrentCard(deck[newIndex])
    }
  }

  const logWorkout = async () => {
    try {
      await workoutAPI.completeWorkout({
        cardId: currentCard.id,
        duration: Number.parseInt(currentCard.duration) || 30,
      })
      alert("Workout logged!")
    } catch (error) {
      console.error("Failed to log workout:", error)
    }
  }

  if (loading) return <div className="text-center py-8">Loading workouts...</div>

  return (
    <div className="page-wrapper">
      <NavigationBar/>

      <div className="container">
        <h1 className="text-3xl text-bold mb-8">Randomized Workout Deck</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          <div className="flex-center">
            <FlipCard card={currentCard} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <VideoPlayer videoUrl={currentCard?.videoUrl} title={currentCard?.name} />

            <WorkoutTimer initialSeconds={Number.parseInt(currentCard?.duration) || 30} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="text-center text-gray">
                Card {currentIndex + 1} of {deck.length}
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className="btn"
                  style={{ flex: 1, backgroundColor: "#d1d5db", color: "#000" }}
                >
                  Previous
                </button>
                <button
                  onClick={nextCard}
                  disabled={currentIndex === deck.length - 1}
                  className="btn"
                  style={{ flex: 1, backgroundColor: "#d1d5db", color: "#000" }}
                >
                  Next
                </button>
              </div>

              <button onClick={logWorkout} className="btn btn-primary btn-lg btn-block">
                Log Workout
              </button>

              <button onClick={loadDeck} className="btn btn-info btn-block">
                Shuffle Deck
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
