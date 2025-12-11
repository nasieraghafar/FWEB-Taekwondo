import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const eventsCollection = db.collection("events");

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await eventsCollection.find({}).toArray();
    res.json(events.map(event => ({
      ...event,
      id: event._id.toString(),
      location: event.location || "",
      time: event.time || ""
    }))); // Convert _id to string for FullCalendar
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
});


// POST new event
router.post("/", async (req, res) => {
  const { title, date, location, time } = req.body;

  if (!title || !date || !location || !time) {
    return res.status(400).json({ message: "Title, date, location, and time are required" });
  }

  try {
    const newEvent = { title, date, location, time };
    const result = await eventsCollection.insertOne(newEvent);
    res.status(201).json({ _id: result.insertedId, id: result.insertedId.toString(), ...newEvent });
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ message: "Error saving event" });
  }
});


// PATCH (Update) an event
router.patch("/:id", async (req, res) => {
  const { title, date, location, time } = req.body;
  const eventId = req.params.id;

  if (!ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: { title, date, location, time } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event" });
  }
});


// DELETE an event
router.delete("/:id", async (req, res) => {
  const eventId = req.params.id;

  if (!ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event" });
  }
});

export default router;
