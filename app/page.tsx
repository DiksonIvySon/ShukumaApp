"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">SHUKUMA</h1>
          <div className="flex gap-4">
            <Link href="/signin">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pretty">Let's Exercise Together</h2>
            <p className="text-lg text-gray-600 mb-8 text-balance">
              Get randomized workout challenges, track your progress, and achieve your fitness goals with zero equipment
              needed.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="bg-secondary/10 rounded-xl h-96 flex items-center justify-center">
            <img
              src="/fitness-workout-illustration.jpg"
              alt="Fitness workout"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg mb-4 flex items-center justify-center text-primary-foreground font-bold text-xl">
              🎲
            </div>
            <h3 className="text-xl font-bold mb-2">Randomized Workouts</h3>
            <p className="text-gray-600">
              Shuffle the deck and get a surprise workout every day to stay engaged and motivated.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
            <div className="w-12 h-12 bg-accent rounded-lg mb-4 flex items-center justify-center text-primary-foreground font-bold text-xl">
              📊
            </div>
            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Log your workouts, track streaks, monitor improvements, and reach new personal records.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
            <div className="w-12 h-12 bg-secondary rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl">
              🎯
            </div>
            <h3 className="text-xl font-bold mb-2">Daily Challenges</h3>
            <p className="text-gray-600">
              Complete daily and weekly challenges to earn achievements and maintain consistency.
            </p>
          </div>
        </div>

        {/* More Features */}
        <div className="grid md:grid-cols-2 gap-8 py-12">
          <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-2">Customizable Workouts</h3>
            <p className="text-gray-600 mb-4">
              Filter by fitness level, duration, or goal type. Tailor your workout to your needs.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Fitness level selection</li>
              <li>✓ Workout duration options</li>
              <li>✓ Goal-based filtering</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-2">Clear Instructions</h3>
            <p className="text-gray-600 mb-4">Step-by-step guides with visual demonstrations for safe, correct form.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Video tutorials</li>
              <li>✓ Exercise illustrations</li>
              <li>✓ Safety tips</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2025 Shukuma. All rights reserved. No equipment necessary.</p>
        </div>
      </footer>
    </div>
  )
}
