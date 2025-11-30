import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import Dashboard from "./pages/Dashboard"
import WorkoutDeck from "./pages/WorkoutDeck"
import BrowseWorkouts from "./pages/BrowseWorkouts"
import ProgressPage from "./pages/ProgressPage"
import ChallengesPage from "./pages/ChallengesPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import Navigation from "./components/Navigation"
import "./styles/index.css"

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token")

  return (
    <div className="app">
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/workout/random" element={isAuthenticated ? <WorkoutDeck /> : <Navigate to="/signin" />} />
        <Route path="/browse" element={isAuthenticated ? <BrowseWorkouts /> : <Navigate to="/signin" />} />
        <Route path="/progress" element={isAuthenticated ? <ProgressPage /> : <Navigate to="/signin" />} />
        <Route path="/challenges" element={isAuthenticated ? <ChallengesPage /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  )
}
