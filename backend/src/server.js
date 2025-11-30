import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import workoutRoutes from "./routes/workouts.js"
import progressRoutes from "./routes/progress.js"
import challengesRoutes from "./routes/challenges.js"
import { initializeDatabase } from "./db/init.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://shukumaapp-frontend2.onrender.com" // deployed frontend
]

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("CORS not allowed from this origin"))
    }
  },
  credentials: true
}))

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/workouts", workoutRoutes)
app.use("/api/progress", progressRoutes)
app.use("/api/challenges", challengesRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error)
    process.exit(1)
  })

