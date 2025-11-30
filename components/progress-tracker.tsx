"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Mon", workouts: 2 },
  { date: "Tue", workouts: 1 },
  { date: "Wed", workouts: 2 },
  { date: "Thu", workouts: 1 },
  { date: "Fri", workouts: 3 },
  { date: "Sat", workouts: 2 },
  { date: "Sun", workouts: 1 },
]

export default function ProgressTracker() {
  return (
    <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Weekly Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
          <Line type="monotone" dataKey="workouts" stroke="#FFC107" strokeWidth={2} dot={{ fill: "#FFC107", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
