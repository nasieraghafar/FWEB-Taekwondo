import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import logo from "../images/tp_logo-removebg-preview.png";

const PublicNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img src={logo} alt="Temasek Poly Logo" className="navbar-logo-img" />
        <div className="navbar-title">Temasek Poly Taekwondo</div>
      </div>
      <div className="navbar-links-container">
        <ul className="navbar-links">
          <li>
            <NavLink className="nav-link" to="/about" activeClassName="active">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/events" activeClassName="active">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/members" activeClassName="active">
              Our Members
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/" activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavbar;
