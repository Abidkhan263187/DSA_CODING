const express = require("express");
const CalendarEvent = require("../models/CalendarEvent");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const { month } = req.query; // YYYY-MM
    const filter = { userId: req.user._id };
    if (month && /^\d{4}-\d{2}$/.test(month)) {
      filter.date = { $regex: `^${month}` };
    }

    const events = await CalendarEvent.find(filter)
      .populate("problemIds", "title difficulty")
      .sort({ date: 1, createdAt: 1 })
      .lean();

    return res.json({ events });
  } catch (err) {
    console.error("calendar list error", err);
    return res.status(500).json({ message: "Could not load calendar" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { date, title, notes, problemIds } = req.body;
    if (!date || !title) {
      return res.status(400).json({ message: "date and title are required" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: "date must be YYYY-MM-DD" });
    }

    const event = await CalendarEvent.create({
      userId: req.user._id,
      date,
      title: title.trim(),
      notes: notes || "",
      problemIds: Array.isArray(problemIds) ? problemIds : [],
    });

    const populated = await event.populate("problemIds", "title difficulty");
    return res.status(201).json({ event: populated });
  } catch (err) {
    console.error("calendar create error", err);
    return res.status(500).json({ message: "Could not create plan" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await CalendarEvent.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("calendar delete error", err);
    return res.status(500).json({ message: "Could not delete plan" });
  }
});

module.exports = router;
