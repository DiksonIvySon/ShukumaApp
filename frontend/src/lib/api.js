import axios from "axios"

const API_BASE_URL =
  typeof process !== "undefined" && process.env?.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  signin: (data) => api.post("/auth/signin", data),
}

export const workoutAPI = {
  getAllCards: () => api.get("/workouts/cards"),
  getCardById: (id) => api.get(`/workouts/cards/${id}`),
  getRandomCard: () => api.get("/workouts/random"),
  completeWorkout: (data) => api.post("/workouts/complete", data),
  getHistory: () => api.get("/workouts/history"),
  addFavorite: (cardId) => api.post(`/workouts/favorite/${cardId}`),
  getFavorites: () => api.get("/workouts/favorites"),
}

export const progressAPI = {
  getStats: () => api.get("/progress/stats"),
  getHistory: () => api.get("/progress/history"),
  getWeekly: () => api.get("/progress/weekly"),
  updateFitnessLevel: (level) => api.put("/progress/fitness-level", { fitnessLevel: level }),
}

export const challengeAPI = {
  getActive: () => api.get("/challenges"),
  create: (data) => api.post("/challenges/create", data),
  updateProgress: (challengeId, currentCount) => api.put(`/challenges/${challengeId}/progress`, { currentCount }),
  getAchievements: () => api.get("/challenges/achievements"),
}

