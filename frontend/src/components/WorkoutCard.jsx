"use client"

export default function WorkoutCard({ workout, onClick }) {
  return (
    <div
      onClick={onClick}
      className="card"
      style={{ cursor: "pointer", transition: "box-shadow 0.3s" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)")}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{workout.name}</h3>
      <p className="text-gray" style={{ marginBottom: "1rem" }}>
        {workout.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
        <span
          style={{ backgroundColor: "#DBEAFE", color: "#1e40af", padding: "0.25rem 0.75rem", borderRadius: "0.375rem" }}
        >
          {workout.difficulty}
        </span>
        <span className="text-gray">{workout.duration}</span>
      </div>
    </div>
  )
}
