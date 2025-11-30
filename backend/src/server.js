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

// Middleware
app.use(cors())
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
