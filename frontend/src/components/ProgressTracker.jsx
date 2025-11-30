export default function ProgressTracker({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p className="stat-label">Workouts Completed</p>
        <p className="stat-value">{stats?.workoutsCompleted || 0}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Current Streak</p>
        <p className="stat-value" style={{ color: "#dc2626" }}>
          {stats?.currentStreak || 0}
        </p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Total Minutes</p>
        <p className="stat-value" style={{ color: "#16a34a" }}>
          {stats?.totalMinutes || 0}
        </p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Longest Streak</p>
        <p className="stat-value" style={{ color: "#2563eb" }}>
          {stats?.longestStreak || 0}
        </p>
      </div>
    </div>
  )
}
