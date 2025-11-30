"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState({
    darkMode: false,
    workoutReminders: true,
    dailyGoalNotifications: true,
    challengeNotifications: true,
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
    } else {
      setUser(JSON.parse(userData))
      const savedSettings = localStorage.getItem("app-settings")
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    }
  }, [router])

  const handleToggle = (key: string) => {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    localStorage.setItem("app-settings", JSON.stringify(updated))
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("app-settings")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 py-8 md:px-8">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        {/* Display Settings */}
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">Display</h2>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Dark Mode</span>
            <button
              onClick={() => handleToggle("darkMode")}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.darkMode ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.darkMode ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Workout Reminders</p>
                <p className="text-sm text-gray-600">Get reminded to complete your daily workouts</p>
              </div>
              <button
                onClick={() => handleToggle("workoutReminders")}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.workoutReminders ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.workoutReminders ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Daily Goal Notifications</p>
                <p className="text-sm text-gray-600">Alerts when you complete daily goals</p>
              </div>
              <button
                onClick={() => handleToggle("dailyGoalNotifications")}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.dailyGoalNotifications ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.dailyGoalNotifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Challenge Notifications</p>
                <p className="text-sm text-gray-600">Updates on active challenges and achievements</p>
              </div>
              <button
                onClick={() => handleToggle("challengeNotifications")}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.challengeNotifications ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.challengeNotifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">Account</h2>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Change Password
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent">
              Privacy Policy
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent">
              Terms of Service
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg p-6 border-2 border-red-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Clear All Data
            </Button>

            <Button
              onClick={handleLogout}
              className="w-full bg-secondary hover:bg-secondary/90 text-white justify-start"
            >
              Logout
            </Button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">Shukuma v1.0 • © 2025</p>
      </main>
    </div>
  )
}
