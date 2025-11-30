"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate sign in
    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    // Store session and redirect
    localStorage.setItem("user", JSON.stringify({ email }))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-secondary via-red-400 to-secondary flex items-center">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Side */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="/athletic-person-fitness-portrait.jpg"
              alt="Fitness portrait"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-2">Welcome back to Shukuma</h2>
            <p className="text-gray-600 mb-8">Sign in to access your personalized workouts</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-3"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
