import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../Dashboard.css";

const AdminDashboard = () => {
  const [userName, setUserName] = useState("Admin"); // Default to "Admin"
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name); // Update the name if available
    }
  }, []); // Run once when the component mounts

  // Function to handle the navigation for each dashboard item
  const handleNavigation = (route) => {
    navigate(route); // Navigate to the given route
  };

  return (
    <div>
      <div className="dashboard-container">
        {/* Welcome Message */}
        <h1 className="welcome-message">Welcome, {userName}! (Admin)</h1>

        {/* Post Announcement Button */}
        <div className="announcement-container">
          <button className="post-announcement-button">
            + Post Announcement
          </button>
        </div>

        {/* Dashboard Buttons */}
        <div className="dashboard-grid">
          {/* Manage Profile */}
          <div
            className="dashboard-item"
          >
            <div className="dashboard-icon">👤</div>
            <div className="dashboard-text">Manage Profile</div>
          </div>

          {/* Mark Attendance */}
          <div
            className="dashboard-item"
            onClick={() => handleNavigation("/mark-attendance")}
          >
            <div className="dashboard-icon">✔️</div>
            <div className="dashboard-text">Mark Attendance</div>
          </div>

          {/* Schedule Events */}
          <div
            className="dashboard-item"
            onClick={() => handleNavigation("/schedule-events")}
          >
            <div className="dashboard-icon">📅</div>
            <div className="dashboard-text">Schedule Events</div>
          </div>

          {/* View Resources */}
          <div
            className="dashboard-item"
          >
            <div className="dashboard-icon">📖</div>
            <div className="dashboard-text">View Resources</div>
          </div>

          {/* View Feedback */}
          <div
            className="dashboard-item"
          >
            <div className="dashboard-icon">✏️</div>
            <div className="dashboard-text">View Feedback</div>
          </div>

          {/* Audit Log */}
          <div
            className="dashboard-item"
          >
            <div className="dashboard-icon">📊</div>
            <div className="dashboard-text">Audit Log</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
