import bcrypt from "bcrypt";
import express from "express";
import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_SECRET || "your_super_secure_secret_key";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in admins collection
    const adminCollection = await db.collection("admins");
    const admin = await adminCollection.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ role: "Admin", userId: admin._id }, jwt_secret, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, role: "Admin", name: admin.name, email: admin.email });
    }

    // Check in students collection
    const studentCollection = await db.collection("students");
    const student = await studentCollection.findOne({ email });

    if (student && (await bcrypt.compare(password, student.password))) {
      const token = jwt.sign(
        { role: "Student", userId: student._id },
        jwt_secret,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token,
        role: "Student",
        name: student.name,
        email: student.email,
        belt_level: student.belt_level,
        year_of_study: student.year_of_study,
      });
    }

    // If no match found
    res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
