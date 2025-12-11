import express from "express";
import cors from "cors";
import students from "./routes/students.mjs"
import admins from "./routes/admins.mjs"
import loginRouter from "./routes/login.mjs";
import events from "./routes/events.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", students)
app.use("/admins", admins)
app.use("/login", loginRouter);
app.use("/events", events)

app.get("/", async (req, res) => {
    res.send("<h1>Hello World</h1>").status(200)
});

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});