import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  // Retrieve the JWT and user info from localStorage
  const token = JSON.parse(localStorage.getItem("jwt"))?.token;
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if the user is authenticated and has the correct role
  if (!token || user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
