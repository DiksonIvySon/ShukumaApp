import sqlite3 from "sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, "shukuma.db")

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database error:", err)
  } else {
    console.log("Connected to SQLite database")
  }
})

export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstName TEXT,
          lastName TEXT,
          fitnessLevel TEXT DEFAULT 'beginner',
          bio TEXT,
          phone TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // Workouts table (user's completed workouts)
      db.run(`
        CREATE TABLE IF NOT EXISTS workouts_completed (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          cardId INTEGER NOT NULL,
          duration INTEGER,
          setsCompleted INTEGER,
          repsCompleted INTEGER,
          notes TEXT,
          completedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `)

      // Progress/Stats table
      db.run(`
        CREATE TABLE IF NOT EXISTS user_progress (
          id TEXT PRIMARY KEY,
          userId TEXT UNIQUE NOT NULL,
          workoutsCompleted INTEGER DEFAULT 0,
          currentStreak INTEGER DEFAULT 0,
          longestStreak INTEGER DEFAULT 0,
          totalMinutes INTEGER DEFAULT 0,
          lastWorkoutDate DATETIME,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `)

      // Challenges table
      db.run(`
        CREATE TABLE IF NOT EXISTS challenges (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          targetCount INTEGER,
          currentCount INTEGER DEFAULT 0,
          difficulty TEXT,
          startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
          endDate DATETIME,
          completed BOOLEAN DEFAULT 0,
          reward TEXT,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `)

      // Favorites table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS favorite_exercises (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          cardId INTEGER NOT NULL,
          addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `,
        () => {
          console.log("Database tables initialized")
          resolve()
        },
      )
    })
  })
}

export function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err)
      else resolve({ id: this.lastID, changes: this.changes })
    })
  })
}

export function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err)
      else resolve(row)
    })
  })
}

export function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}
