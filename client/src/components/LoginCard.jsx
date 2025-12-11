import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user details in local storage
        localStorage.setItem(
          "jwt",
          JSON.stringify({
            token: data.token,
          })
        );
        localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          name: data.name,
          role: data.role,
        })
      );

        // Redirect based on role
        if (data.role === "Admin") {
          navigate("/admin-home");
        } else if (data.role === "Student") {
          navigate("/student-home");
        } else {
          setError("Invalid role");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-card">
      <form onSubmit={handleLogin}>
        <div>
          <label>Admin Email</label>
          <input
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Admin Password</label>
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a
            href="#forgot-password"
            className="forgot-password"
            onClick={(e) => {
              e.preventDefault();
              navigate("/forgot-password"); // Redirect to a "Forgot Password" page
            }}
          >
            Forget Password
          </a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
        <button type="submit" className="login-button">
          Login
        </button>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate("/register")} // Navigate to register page
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
