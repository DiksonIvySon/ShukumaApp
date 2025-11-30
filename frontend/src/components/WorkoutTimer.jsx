"use client"

import { useState, useEffect } from "react"

export default function WorkoutTimer({ initialSeconds = 30, onComplete }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    } else if (seconds === 0 && isActive) {
      setIsActive(false)
      onComplete?.()
    }

    return () => clearInterval(interval)
  }, [isActive, seconds, onComplete])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setSeconds(initialSeconds)
    setIsActive(false)
  }

  const displaySeconds = String(seconds).padStart(2, "0")

  return (
    <div className="flex-col flex-center" style={{ gap: "1rem" }}>
      <div style={{ fontSize: "3.75rem", fontWeight: "bold", color: "var(--primary)" }}>
        {Math.floor(seconds / 60)}:{displaySeconds}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={toggleTimer} className="btn btn-primary">
          {isActive ? "PAUSE" : "START"}
        </button>
        <button onClick={resetTimer} className="btn" style={{ backgroundColor: "#d1d5db", color: "#000" }}>
          RESET
        </button>
      </div>
    </div>
  )
}
