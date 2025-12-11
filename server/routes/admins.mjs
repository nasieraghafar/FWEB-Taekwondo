import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { verifyToken, isAdmin } from "./auth.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("admins");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("admins");
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
            password: hashedPassword, // Store hashed password
        };

        let collection = await db.collection("admins");
        let result = await collection.insertOne(newDocument);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: "Error creating admin", error });
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
                ...(hashedPassword && { password: hashedPassword }), // Update password only if provided
            },
        };

        let collection = await db.collection("admins");
        let result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, updates);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: "Error updating admin", error });
    }
});

router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("admins");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

router.post("/admin-login", async (req, res) => {
    const { email, password } = req.body;

    let collection = await db.collection("admins");
    const admin = await collection.findOne({ email });

    if (admin && admin.password === password) {
        // Successful authentication
        res.status(200).send({ message: "Login successful", admin });
    } else {
        // Invalid email or password
        res.status(401).send({ message: "Invalid email or password" });
    }
});

export default router;