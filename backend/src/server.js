require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
const Topic = require("./models/Topic");
const { seedIfEmpty } = require("./seed/seedIfEmpty");
const authRoutes = require("./routes/auth");
const topicRoutes = require("./routes/topics");
const progressRoutes = require("./routes/progress");
const calendarRoutes = require("./routes/calendar");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "dsa-tracker-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/calendar", calendarRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

connectDb()
  .then(async () => {
    const count = await Topic.countDocuments();
    if (count === 0) {
      await seedIfEmpty();
    }
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
