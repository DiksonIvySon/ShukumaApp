import axios from "axios";

// ✅ Choose base URL depending on environment
const API_BASE = process.env.NODE_ENV === "production"
  ? "https://shukumaapp-backend.onrender.com" // deployed backend URL
  : "http://localhost:5000"; // local dev backend

const api = axios.create({
  baseURL: API_BASE, // don't append /api here; keep it in the axios calls
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- your APIs remain the same ---
export const authAPI = {
  signup: (data) => api.post("/api/auth/signup", data),
  signin: (data) => api.post("/api/auth/signin", data),
};

export const workoutAPI = {
  getAllCards: () => api.get("/api/workouts/cards"),
  getCardById: (id) => api.get(`/api/workouts/cards/${id}`),
  getRandomCard: () => api.get("/api/workouts/random"),
  completeWorkout: (data) => api.post("/api/workouts/complete", data),
  getHistory: () => api.get("/api/workouts/history"),
  addFavorite: (cardId) => api.post(`/api/workouts/favorite/${cardId}`),
  getFavorites: () => api.get("/api/workouts/favorites"),
};

export const progressAPI = {
  getStats: () => api.get("/api/progress/stats"),
  getHistory: () => api.get("/api/progress/history"),
  getWeekly: () => api.get("/api/progress/weekly"),
  updateFitnessLevel: (level) => api.put("/api/progress/fitness-level", { fitnessLevel: level }),
};

export const challengeAPI = {
  getActive: () => api.get("/api/challenges"),
  create: (data) => api.post("/api/challenges/create", data),
  updateProgress: (challengeId, currentCount) => api.put(`/api/challenges/${challengeId}/progress`, { currentCount }),
  getAchievements: () => api.get("/api/challenges/achievements"),
};


