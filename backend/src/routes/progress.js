const express = require("express");
const Progress = require("../models/Progress");
const Problem = require("../models/Problem");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/toggle", requireAuth, async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ message: "problemId is required" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const existing = await Progress.findOne({
      userId: req.user._id,
      problemId,
    });

    if (existing && existing.completed) {
      existing.completed = false;
      existing.completedAt = null;
      await existing.save();
      return res.json({ problemId, completed: false });
    }

    if (existing) {
      existing.completed = true;
      existing.completedAt = new Date();
      await existing.save();
      return res.json({ problemId, completed: true });
    }

    await Progress.create({
      userId: req.user._id,
      problemId,
      completed: true,
      completedAt: new Date(),
    });
    return res.json({ problemId, completed: true });
  } catch (err) {
    console.error("toggle progress error", err);
    return res.status(500).json({ message: "Could not update progress" });
  }
});

module.exports = router;
