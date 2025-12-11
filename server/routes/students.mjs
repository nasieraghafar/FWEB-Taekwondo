import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const router = express.Router();
const studentsCollection = db.collection("students");

router.get("/", async (req, res) => {
    try {
        let students = await studentsCollection.find({}).toArray();
        const selectedDate = req.query.date; // Get date from query params

        students = students.map(student => {
            const totalSessions = student.attendance ? student.attendance.length : 0;
            const presentCount = student.attendance
                ? student.attendance.filter(record => record.status === "Present").length
                : 0;
            const attendancePercentage = totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0;

            // Find attendance for the selected date
            const attendanceRecord = student.attendance?.find(record => record.date === selectedDate);
            const status = attendanceRecord ? attendanceRecord.status : "Not Marked";

            return {
                ...student,
                attendancePercentage: attendancePercentage.toFixed(2),
                attendanceStatus: status
            };
        });

        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students" });
    }
});


router.get("/:id", async (req, res) => {
    let collection = await db.collection("students");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

        let newDocument = {
            name: req.body.name,
            email: req.body.email,
            belt_level: req.body.belt_level,
            year_of_study: req.body.year_of_study,
            password: hashedPassword, // Store hashed password
            profile_image: req.body.profile_image,
        };

        let collection = await db.collection("students");
        let result = await collection.insertOne(newDocument);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: "Error creating student", error });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const hashedPassword = req.body.password
            ? await bcrypt.hash(req.body.password, 10) // Hash password if provided
            : undefined;

        const updates = {
            $set: {
                name: req.body.name,
                email: req.body.email,
                belt_level: req.body.belt_level,
                year_of_study: req.body.year_of_study,
                ...(hashedPassword && { password: hashedPassword }), // Update password only if provided
                profile_image: req.body.profile_image,
            },
        };

        let collection = await db.collection("students");
        let result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, updates);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: "Error updating student", error });
    }
});

router.patch("/:id/attendance", async (req, res) => {
    const { date, status } = req.body;
    const studentId = req.params.id;

    if (!ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }

    if (!date || !status) {
        return res.status(400).json({ message: "Date and status are required" });
    }

    try {
        const student = await studentsCollection.findOne({ _id: new ObjectId(studentId) });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const attendanceExists = student.attendance?.some(record => record.date === date);

        if (attendanceExists) {
            // Update existing attendance record
            await studentsCollection.updateOne(
                { _id: new ObjectId(studentId), "attendance.date": date },
                { $set: { "attendance.$.status": status } }
            );
        } else {
            // Add new attendance entry
            await studentsCollection.updateOne(
                { _id: new ObjectId(studentId) },
                { $push: { attendance: { date, status } } }
            );
        }

        // Recalculate attendance percentage
        const updatedStudent = await studentsCollection.findOne({ _id: new ObjectId(studentId) });

        const totalSessions = updatedStudent.attendance ? updatedStudent.attendance.length : 0;
        const presentCount = updatedStudent.attendance
            ? updatedStudent.attendance.filter(record => record.status === "Present").length
            : 0;
        const attendancePercentage = totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0;

        res.json({
            message: "Attendance recorded successfully",
            attendancePercentage: attendancePercentage.toFixed(2),
        });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: "Error marking attendance" });
    }
});

//Fetch a Student's Attendance
router.get("/:id/attendance", async (req, res) => {
    const studentId = req.params.id;

    if (!ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }

    try {
        const student = await studentsCollection.findOne({ _id: new ObjectId(studentId) }, { projection: { attendance: 1 } });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student.attendance || []);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Error fetching attendance" });
    }
});

//Fetch Attendance for All Students
router.get("/attendance/all", async (req, res) => {
    try {
        const students = await studentsCollection.find({}, { projection: { name: 1, attendance: 1 } }).toArray();
        res.json(students);
    } catch (error) {
        console.error("Error fetching all attendance records:", error);
        res.status(500).json({ message: "Error fetching attendance records" });
    }
});

router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("students");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;