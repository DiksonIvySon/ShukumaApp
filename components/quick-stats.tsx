"use client"

interface QuickStatsProps {
  workoutStreak: number
  totalWorkouts: number
}

export default function QuickStats({ workoutStreak, totalWorkouts }: QuickStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
        <p className="text-gray-600 text-sm mb-2">Current Streak</p>
        <p className="text-4xl font-bold text-primary">{workoutStreak}</p>
        <p className="text-xs text-gray-500 mt-2">days in a row</p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
        <p className="text-gray-600 text-sm mb-2">Total Workouts</p>
        <p className="text-4xl font-bold text-secondary">{totalWorkouts}</p>
        <p className="text-xs text-gray-500 mt-2">all time</p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
        <p className="text-gray-600 text-sm mb-2">Calories Burned</p>
        <p className="text-4xl font-bold text-accent">2,145</p>
        <p className="text-xs text-gray-500 mt-2">this month</p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
        <p className="text-gray-600 text-sm mb-2">Achievements</p>
        <p className="text-4xl font-bold">8</p>
        <p className="text-xs text-gray-500 mt-2">unlocked</p>
      </div>
    </div>
  )
}
