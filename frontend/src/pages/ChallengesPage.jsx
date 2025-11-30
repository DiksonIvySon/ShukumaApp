import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // or next/navigation if using Next.js
import Navigation from "../components/Navigation"; // adjust path
import "../styles/ChallengesPage.css";

const CHALLENGES = [
  {
    id: 1,
    name: "7-Day Streak",
    description: "Complete a workout every day for a week",
    progress: 1,
    total: 7,
    reward: "🏆 Gold Badge",
  },
  {
    id: 2,
    name: "Push-up Master",
    description: "Complete 100 push-ups total",
    progress: 8,
    total: 100,
    reward: "⭐ 50 XP",
  },
  {
    id: 3,
    name: "Weekly Warrior",
    description: "Complete 5 workouts this week",
    progress: 0,
    total: 5,
    reward: "🎯 Active Badge",
  },
  {
    id: 4,
    name: "Speed Runner",
    description: "Complete 3 workouts in under 15 minutes",
    progress: 0,
    total: 3,
    reward: "⚡ Lightning Badge",
  },
];

export default function ChallengesPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/signin");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="challenges-page">
      {/* <Navigation /> */}

      <main className="challenges-main">
        <h1>Challenges & Goals</h1>
        <p>Complete challenges to earn rewards and stay motivated!</p>

        <div className="challenges-grid">
          {CHALLENGES.map((challenge) => {
            const progressPercent = (challenge.progress / challenge.total) * 100;

            return (
              <div key={challenge.id} className="challenge-card">
                <div className="challenge-header">
                  <div>
                    <h3>{challenge.name}</h3>
                    <p>{challenge.description}</p>
                  </div>
                  <span className="challenge-reward">{challenge.reward}</span>
                </div>

                <div className="challenge-progress-section">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>
                      {challenge.progress} / {challenge.total}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <button className="challenge-btn">View Challenge</button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

