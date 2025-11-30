


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fitnessLevel: "beginner",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/signin");
      return;
    }

    const parsed = JSON.parse(userData);
    setUser(parsed);

    setProfile(prev => ({
      ...prev,
      firstName: parsed.firstName || "",
      email: parsed.email || "",
      fitnessLevel: parsed.fitnessLevel || "beginner",
    }));
  }, [navigate]);

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, ...profile })
    );

    setSaved(true);
    setIsEditing(false);

    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <main className="profile-content">
        
        <div className="profile-header">
          <h1>Your Profile</h1>
          <button 
            className="edit-btn" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {saved && (
          <div className="success-message">
            Profile updated successfully!
          </div>
        )}

        <div className="profile-card">

          {/* Avatar */}
          <div className="avatar-section">
            <div className="avatar-circle">
              {profile.firstName[0]?.toUpperCase() || "U"}
            </div>

            <div>
              <h2>{profile.firstName} {profile.lastName}</h2>
              <p>{profile.email}</p>
            </div>
          </div>

          {/* Form */}
          <div className="form-grid">

            <div className="form-group">
              <label>First Name</label>
              <input 
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input 
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Fitness Level</label>
            <select
              name="fitnessLevel"
              value={profile.fitnessLevel}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              rows="4"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-box">
            <p className="stat-label">Member Since</p>
            <p className="stat-value">2025</p>
          </div>

          <div className="stat-box">
            <p className="stat-label">Total Level</p>
            <p className="stat-value">{profile.fitnessLevel}</p>
          </div>

          <div className="stat-box">
            <p className="stat-label">Community Rank</p>
            <p className="stat-value">Enthusiast</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="preferences-card">
          <h2>Preferences</h2>

          <div className="pref-item">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="pref-item">
            <span>Push Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="pref-item">
            <span>Share Progress Publicly</span>
            <input type="checkbox" />
          </div>

        </div>

      </main>
    </div>
  );
}

