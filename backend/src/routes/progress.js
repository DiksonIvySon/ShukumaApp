import express from "express"
import { getQuery, allQuery, runQuery } from "../db/init.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/stats", verifyToken, async (req, res) => {
  try {
    const progress = await getQuery("SELECT * FROM user_progress WHERE userId = ?", [req.userId])
    res.json(progress || {})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/history", verifyToken, async (req, res) => {
  try {
    const workouts = await allQuery(
      `SELECT completedAt, duration FROM workouts_completed 
       WHERE userId = ? 
       ORDER BY completedAt DESC 
       LIMIT 30`,
      [req.userId],
    )
    res.json({ workouts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/weekly", verifyToken, async (req, res) => {
  try {
    const weeklyStats = await allQuery(
      `SELECT 
         DATE(completedAt) as date,
         COUNT(*) as workoutCount,
         SUM(duration) as totalMinutes
       FROM workouts_completed 
       WHERE userId = ? AND completedAt >= datetime('now', '-7 days')
       GROUP BY DATE(completedAt)`,
      [req.userId],
    )
    res.json({ weeklyStats })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/fitness-level", verifyToken, async (req, res) => {
  try {
    const { fitnessLevel } = req.body
    await runQuery("UPDATE users SET fitnessLevel = ? WHERE id = ?", [fitnessLevel, req.userId])
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
