import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { runQuery, getQuery } from "../db/init.js"

const router = express.Router()

// Database user storage
const users = []

// Sign up
router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const existingUser = await getQuery("SELECT * FROM users WHERE email = ?", [email])
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = Date.now().toString()

    await runQuery("INSERT INTO users (id, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)", [
      userId,
      email,
      hashedPassword,
      firstName || "",
      lastName || "",
    ])

    // Create user progress record
    await runQuery("INSERT INTO user_progress (id, userId) VALUES (?, ?)", [Date.now().toString(), userId])

    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET || "your-secret-key")

    res.json({
      success: true,
      token,
      user: { id: userId, email, firstName, lastName },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Sign in
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const user = await getQuery("SELECT * FROM users WHERE email = ?", [email])
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "your-secret-key")

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
