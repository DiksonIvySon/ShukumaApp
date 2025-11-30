"use client"

import { useState } from "react"
import "./FlipCard.css"

export default function FlipCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false)

  if (!card) return null

  const suitColors = {
    hearts: "#FFB6D9",
    diamonds: "#FFFACD",
    clubs: "#C1FFC1",
    spades: "#FFE4B5",
  }

  return (
    <div className="flex-center">
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ backgroundColor: suitColors[card.suit] }}
      >
        <div className="flip-card-inner" style={{ backgroundColor: suitColors[card.suit] }}>
          <div className="flip-card-front">
            <p style={{ fontSize: "3.75rem", fontWeight: "bold" }}>{card.rank}</p>
            {card.imageUrl && (
              <img
                src={card.imageUrl || "/placeholder.svg"}
                alt={card.name}
                style={{
                  height: "16rem",
                  width: "12rem",
                  objectFit: "cover",
                  borderRadius: "0.375rem",
                  marginTop: "1rem",
                }}
              />
            )}
          </div>

          <div className="flip-card-back">
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <div style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
              <p>
                <strong>Difficulty:</strong> {card.difficulty}
              </p>
              <p>
                <strong>Duration:</strong> {card.duration}
              </p>
              <p>
                <strong>Category:</strong> {card.category}
              </p>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Instructions:</p>
              <ul style={{ fontSize: "0.75rem", listStyle: "none" }}>
                {card.instructions?.map((instruction, i) => (
                  <li key={i} style={{ marginBottom: "0.25rem" }}>
                    {i + 1}. {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
