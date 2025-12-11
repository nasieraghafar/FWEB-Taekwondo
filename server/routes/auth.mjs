import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_SECRET || "your_super_secure_secret_key";

// Middleware to verify JWT
export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded; // Save the decoded user info to request object
    next();
  });
}

// Middleware to restrict access to admins
export function isAdmin(req, res, next) {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
}

// Middleware to restrict access to students
export function isStudent(req, res, next) {
  if (req.user.role !== "Student") {
    return res.status(403).json({ message: "Access denied: Students only" });
  }
  next();
}
