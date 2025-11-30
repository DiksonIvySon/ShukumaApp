import express from "express"
import { runQuery, getQuery, allQuery } from "../db/init.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, async (req, res) => {
  try {
    const challenges = await allQuery(
      "SELECT * FROM challenges WHERE userId = ? AND completed = 0 ORDER BY endDate ASC",
      [req.userId],
    )
    res.json({ challenges })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name, description, targetCount, difficulty, daysToComplete, reward } = req.body
    const challengeId = Date.now().toString()
    const endDate = new Date(Date.now() + (daysToComplete || 7) * 24 * 60 * 60 * 1000)

    await runQuery(
      `INSERT INTO challenges 
       (id, userId, name, description, targetCount, difficulty, endDate, reward)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [challengeId, req.userId, name, description, targetCount, difficulty, endDate.toISOString(), reward || ""],
    )

    res.json({ success: true, challengeId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:challengeId/progress", verifyToken, async (req, res) => {
  try {
    const { currentCount } = req.body
    const challenge = await getQuery("SELECT * FROM challenges WHERE id = ? AND userId = ?", [
      req.params.challengeId,
      req.userId,
    ])

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" })
    }

    const isCompleted = currentCount >= challenge.targetCount

    await runQuery(
      `UPDATE challenges 
       SET currentCount = ?, completed = ?
       WHERE id = ?`,
      [currentCount, isCompleted ? 1 : 0, req.params.challengeId],
    )

    res.json({ success: true, completed: isCompleted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/achievements", verifyToken, async (req, res) => {
  try {
    const achievements = await allQuery(
      "SELECT * FROM challenges WHERE userId = ? AND completed = 1 ORDER BY endDate DESC",
      [req.userId],
    )
    res.json({ achievements })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
