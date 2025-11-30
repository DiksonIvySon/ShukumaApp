"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { FlipCard } from "@/components/flip-card"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { CARDS_DATA, shuffleDeck, type Card } from "@/lib/cards-data"
import Link from "next/link"

export default function RandomWorkoutPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [deck, setDeck] = useState<Card[]>([])
  const [isShuffling, setIsShuffling] = useState(false)
  const [startedWorkout, setStartedWorkout] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
    } else {
      setUser(JSON.parse(userData))
      initializeDeck()
    }
  }, [router])

  const initializeDeck = () => {
    const shuffled = shuffleDeck(CARDS_DATA)
    setDeck(shuffled)
    setCurrentCardIndex(0)
    setStartedWorkout(false)
  }

  const handleShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      initializeDeck()
      setIsShuffling(false)
    }, 600)
  }

  const handleNextCard = () => {
    if (currentCardIndex < deck.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  if (!user || deck.length === 0) return null

  const currentCard = deck[currentCardIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-12 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Workout Deck</h1>
          <p className="text-gray-600 text-lg">Shuffle and flip cards to discover your next exercise</p>
        </div>

        {/* Deck Progress */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCardIndex + 1) / deck.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            {currentCardIndex + 1} / {deck.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Flip Card - Left Side */}
          <div
            className={`lg:col-span-1 transition-all duration-500 ${isShuffling ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
          >
            <FlipCard card={currentCard} animated={true} />
          </div>

          {/* Tutorial Video - Right Side */}
          <div className="lg:col-span-2">
            {currentCard.videoUrl ? (
              <VideoPlayer
                videoUrl={currentCard.videoUrl}
                title={`Tutorial: ${currentCard.name}`}
                duration={currentCard.duration}
              />
            ) : (
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-400">
                <div className="text-center">
                  <p className="text-gray-600 font-semibold mb-2">No video available</p>
                  <p className="text-gray-500 text-sm">Check the flip card for instructions</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">Name</p>
              <p className="font-bold text-gray-800">{currentCard.name}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">Duration</p>
              <p className="font-bold text-primary">{currentCard.duration}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">Difficulty</p>
              <p className="font-bold capitalize text-secondary">{currentCard.difficulty}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">Category</p>
              <p className="font-bold text-accent">{currentCard.category}</p>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          <Button
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            variant="outline"
            className="px-6 bg-transparent"
          >
            ← Previous
          </Button>

          <Button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 font-bold"
          >
            🔀 Shuffle Deck
          </Button>

          <Button
            onClick={handleNextCard}
            disabled={currentCardIndex === deck.length - 1}
            variant="outline"
            className="px-6 bg-transparent"
          >
            Next →
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col md:flex-row">
          <Link href={`/workout/${currentCard.id}`} className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg">
              START THIS WORKOUT
            </Button>
          </Link>

          <Link href="/browse" className="flex-1">
            <Button variant="outline" className="w-full font-bold py-6 text-lg bg-transparent">
              Browse Catalog
            </Button>
          </Link>
        </div>

        {/* Cards Remaining */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 text-center">
          <p className="text-gray-600 mb-2">Cards remaining to explore</p>
          <p className="text-3xl font-bold text-primary">{deck.length - currentCardIndex - 1}</p>
          <p className="text-sm text-gray-600 mt-2">Keep shuffling to discover all 52 exercises</p>
        </div>
      </main>
    </div>
  )
}
