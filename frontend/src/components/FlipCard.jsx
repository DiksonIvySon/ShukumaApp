import { useState } from "react"
import "./FlipCard.css"

import card1 from "../assets/cards/1.jpg";
import card2 from "../assets/cards/2.jpg";
import card3 from "../assets/cards/3.jpg";
import card4 from "../assets/cards/4.jpg";
import card5 from "../assets/cards/5.jpg";
import card6 from "../assets/cards/6.jpg";
import card7 from "../assets/cards/7.jpg";
import card8 from "../assets/cards/8.jpg";
import card9 from "../assets/cards/9.jpg";
import card10 from "../assets/cards/10.jpg";
import card11 from "../assets/cards/11.jpg";
import card12 from "../assets/cards/12.jpg";
import card13 from "../assets/cards/13.jpg";
import card14 from "../assets/cards/14.jpg";
import card15 from "../assets/cards/15.jpg";
import card16 from "../assets/cards/16.jpg";
import card17 from "../assets/cards/17.jpg";
import card18 from "../assets/cards/18.jpg";
import card19 from "../assets/cards/19.jpg";
import card20 from "../assets/cards/20.jpg";
import card21 from "../assets/cards/21.jpg";
import card22 from "../assets/cards/22.jpg";
import card23 from "../assets/cards/23.jpg";
import card24 from "../assets/cards/24.jpg";
import card25 from "../assets/cards/25.jpg";
import card26 from "../assets/cards/26.jpg";
import card27 from "../assets/cards/27.jpg";
import card28 from "../assets/cards/28.jpg";
import card29 from "../assets/cards/29.jpg";
import card30 from "../assets/cards/30.jpg";
import card31 from "../assets/cards/31.jpg";
import card32 from "../assets/cards/32.jpg";
import card33 from "../assets/cards/33.jpg";
import card34 from "../assets/cards/34.jpg";
import card35 from "../assets/cards/35.jpg";
import card36 from "../assets/cards/36.jpg";
import card37 from "../assets/cards/37.jpg";
import card38 from "../assets/cards/38.jpg";
import card39 from "../assets/cards/39.jpg";
import card40 from "../assets/cards/40.jpg";
import card41 from "../assets/cards/41.jpg";
import card42 from "../assets/cards/42.jpg";
import card43 from "../assets/cards/43.jpg";
import card44 from "../assets/cards/44.jpg";
import card45 from "../assets/cards/45.jpg";
import card46 from "../assets/cards/46.jpg";
import card47 from "../assets/cards/47.jpg";
import card48 from "../assets/cards/48.jpg";
import card49 from "../assets/cards/49.jpg";
import card50 from "../assets/cards/50.jpg";
import card51 from "../assets/cards/51.jpg";
import card52 from "../assets/cards/52.jpg";

export const cardImages = {
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
  card13,
  card14,
  card15,
  card16,
  card17,
  card18,
  card19,
  card20,
  card21,
  card22,
  card23,
  card24,
  card25,
  card26,
  card27,
  card28,
  card29,
  card30,
  card31,
  card32,
  card33,
  card34,
  card35,
  card36,
  card37,
  card38,
  card39,
  card40,
  card41,
  card42,
  card43,
  card44,
  card45,
  card46,
  card47,
  card48,
  card49,
  card50,
  card51,
  card52,
};

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
            {/* <p style={{ fontSize: "3.75rem", fontWeight: "bold" }}>{card.rank}</p> */}
            <h3>{card.name}</h3>
            {card.imageUrl && (
              <img
                src={cardImages[card.imageUrl]}
                // src={card1 || "/placeholder.svg"}
                alt={card.name}
                style={{
                  height: "20rem",
                  width: "16rem",
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
