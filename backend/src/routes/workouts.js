import express from "express"
import { runQuery, getQuery, allQuery } from "../db/init.js"
import { verifyToken } from "../middleware/auth.js"
import { CARDS_DATA } from "../data/cards.js"

const router = express.Router()

router.get("/cards", (req, res) => {
  try {
    res.json({ cards: CARDS_DATA })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/cards/:id", (req, res) => {
  try {
    const card = CARDS_DATA.find((c) => c.id === Number.parseInt(req.params.id))
    if (!card) return res.status(404).json({ error: "Card not found" })
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/random", (req, res) => {
  try {
    const randomCard = CARDS_DATA[Math.floor(Math.random() * CARDS_DATA.length)]
    res.json(randomCard)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/complete", verifyToken, async (req, res) => {
  try {
    const { cardId, duration, setsCompleted, repsCompleted, notes } = req.body
    const workoutId = Date.now().toString()

    await runQuery(
      `INSERT INTO workouts_completed 
       (id, userId, cardId, duration, setsCompleted, repsCompleted, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [workoutId, req.userId, cardId, duration, setsCompleted, repsCompleted, notes || ""],
    )

    // Update progress stats
    const progress = await getQuery("SELECT * FROM user_progress WHERE userId = ?", [req.userId])
    if (progress) {
      await runQuery(
        `UPDATE user_progress 
         SET workoutsCompleted = workoutsCompleted + 1,
             totalMinutes = totalMinutes + ?,
             lastWorkoutDate = CURRENT_TIMESTAMP
         WHERE userId = ?`,
        [duration || 0, req.userId],
      )
    }

    res.json({ success: true, workoutId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/history", verifyToken, async (req, res) => {
  try {
    const workouts = await allQuery("SELECT * FROM workouts_completed WHERE userId = ? ORDER BY completedAt DESC", [
      req.userId,
    ])
    res.json({ workouts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/favorite/:cardId", verifyToken, async (req, res) => {
  try {
    const favoriteId = Date.now().toString()
    await runQuery("INSERT INTO favorite_exercises (id, userId, cardId) VALUES (?, ?, ?)", [
      favoriteId,
      req.userId,
      req.params.cardId,
    ])
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/favorites", verifyToken, async (req, res) => {
  try {
    const favorites = await allQuery("SELECT cardId FROM favorite_exercises WHERE userId = ?", [req.userId])
    const favoriteCards = favorites.map((fav) => CARDS_DATA.find((c) => c.id === fav.cardId)).filter(Boolean)
    res.json({ favorites: favoriteCards })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
