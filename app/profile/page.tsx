"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fitnessLevel: "beginner",
    bio: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
    } else {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setProfile((prev) => ({
        ...prev,
        firstName: parsed.firstName || "",
        email: parsed.email || "",
        fitnessLevel: parsed.fitnessLevel || "beginner",
      }))
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...profile,
      }),
    )
    setSaved(true)
    setIsEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 py-8 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <Button onClick={() => setIsEditing(!isEditing)} className={isEditing ? "bg-secondary" : "bg-primary"}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            Profile updated successfully!
          </div>
        )}

        <div className="bg-white rounded-lg p-8 border border-border shadow-sm space-y-6">
          {/* Profile Avatar Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-3xl font-bold">
              {profile.firstName[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-border rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-border rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fitness Level</label>
            <select
              name="fitnessLevel"
              value={profile.fitnessLevel}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-border rounded-lg disabled:bg-gray-100"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg disabled:bg-gray-100"
              placeholder="Tell us about your fitness goals..."
            />
          </div>

          {isEditing && (
            <Button
              onClick={handleSave}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
            >
              Save Changes
            </Button>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Member Since</p>
            <p className="text-2xl font-bold text-primary">2025</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Total Level</p>
            <p className="text-2xl font-bold text-secondary capitalize">{profile.fitnessLevel}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Community Rank</p>
            <p className="text-2xl font-bold text-accent">Enthusiast</p>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-lg p-8 border border-border shadow-sm mt-8">
          <h2 className="text-2xl font-bold mb-6">Preferences</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Push Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Share Progress Publicly</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
