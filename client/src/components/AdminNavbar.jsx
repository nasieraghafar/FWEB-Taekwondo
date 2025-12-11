import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../images/tp_logo-removebg-preview.png";

const AdminNavbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user"); // Remove user data from local storage
    navigate("/"); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img src={logo} alt="Temasek Poly Logo" className="navbar-logo-img" />
        <div className="navbar-title">Temasek Poly Taekwondo</div>
      </div>
      <div className="navbar-links-container">
        <ul className="navbar-links">
          <li>
            <NavLink className="nav-link" to="/admin-home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin-members">
              Our Members
            </NavLink>
          </li>
          <li>
            <button className="nav-link logout-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
