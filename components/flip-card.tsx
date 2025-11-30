"use client"

import { useState } from "react"
import type { Card } from "@/lib/cards-data"
import { cn } from "@/lib/utils"

interface FlipCardProps {
  card: Card
  isFlipped?: boolean
  onClick?: () => void
  animated?: boolean
}

export function FlipCard({ card, isFlipped = false, onClick, animated = true }: FlipCardProps) {
  const [flipped, setFlipped] = useState(isFlipped)

  const handleClick = () => {
    setFlipped(!flipped)
    onClick?.()
  }

  const getSuitColor = (suit: string) => {
    switch (suit) {
      case "diamonds":
        return "from-yellow-100 to-yellow-200 border-yellow-400"
      case "hearts":
        return "from-pink-100 to-pink-200 border-pink-400"
      case "clubs":
        return "from-green-100 to-green-200 border-green-400"
      case "spades":
        return "from-orange-100 to-orange-200 border-orange-400"
      default:
        return "from-gray-100 to-gray-200"
    }
  }

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case "diamonds":
        return "♦"
      case "hearts":
        return "♥"
      case "clubs":
        return "♣"
      case "spades":
        return "♠"
      default:
        return "•"
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative w-full h-96 cursor-pointer rounded-xl shadow-2xl",
        animated && "transition-transform hover:shadow-3xl",
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Card Container with 3D flip effect */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card - Exercise Illustration */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl p-6 flex flex-col justify-between border-4 shadow-xl",
            getSuitColor(card.suit),
            "backface-hidden",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Card corners with rank and suit */}
          <div className="flex justify-between">
            <div className="text-left">
              <div className="text-4xl font-bold text-gray-800">{card.rank}</div>
              <div className="text-3xl text-gray-700">{getSuitSymbol(card.suit)}</div>
            </div>
            <div className="text-right opacity-50">
              <div className="text-4xl font-bold text-gray-800">{card.rank}</div>
              <div className="text-3xl text-gray-700">{getSuitSymbol(card.suit)}</div>
            </div>
          </div>

          {/* Exercise image */}
          <div className="flex-1 flex items-center justify-center -mx-6 -my-2">
            <img src={card.imageUrl || "/placeholder.svg"} alt={card.name} className="h-full object-contain max-h-56" />
          </div>

          {/* Bottom instructions */}
          <div className="text-center font-semibold text-gray-800 text-sm">Click to see details →</div>
        </div>

        {/* Back of card - Instructions and Details */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl p-6 flex flex-col justify-between border-4 shadow-xl",
            "bg-gradient-to-b from-blue-50 to-indigo-100 border-blue-400",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.name}</h3>
            <p className="text-sm text-gray-700 mb-4">{card.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
              <div className="bg-white/80 rounded-lg p-2 text-center">
                <p className="font-bold text-gray-800">{card.duration}</p>
                <p className="text-gray-600 text-xs">Duration</p>
              </div>
              <div className="bg-white/80 rounded-lg p-2 text-center">
                <p className="font-bold capitalize text-gray-800">{card.difficulty}</p>
                <p className="text-gray-600 text-xs">Level</p>
              </div>
              <div className="bg-white/80 rounded-lg p-2 text-center">
                <p className="font-bold text-gray-800">{card.sets || 3}</p>
                <p className="text-gray-600 text-xs">Sets</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white/80 rounded-lg p-3 max-h-28 overflow-y-auto">
              <p className="font-bold text-gray-800 mb-2 text-xs">How to perform:</p>
              <ol className="space-y-1 text-xs text-gray-700">
                {card.instructions.map((instruction, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold flex-shrink-0">{i + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Bottom flip instruction */}
          <div className="text-center font-semibold text-gray-700 text-sm">← Click to flip back</div>
        </div>
      </div>
    </div>
  )
}
