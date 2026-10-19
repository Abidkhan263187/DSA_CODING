const express = require("express");
const Topic = require("../models/Topic");
const Problem = require("../models/Problem");
const Progress = require("../models/Progress");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

let catalog = null;
let catalogAt = 0;
const CATALOG_TTL_MS = 60 * 1000;

async function getCatalog() {
  const fresh = catalog && Date.now() - catalogAt < CATALOG_TTL_MS;
  if (fresh) return catalog;

  const [topics, problems] = await Promise.all([
    Topic.find().select("title description order").sort({ order: 1 }).lean(),
    Problem.find()
      .select("topicId title difficulty youtubeUrl practiceUrl articleUrl order")
      .sort({ order: 1 })
      .lean(),
  ]);

  catalog = { topics, problems };
  catalogAt = Date.now();
  return catalog;
}

router.get("/", requireAuth, async (req, res) => {
  try {
    const [{ topics, problems }, done] = await Promise.all([
      getCatalog(),
      Progress.find({ userId: req.user._id, completed: true }).select("problemId").lean(),
    ]);

    const doneSet = new Set(done.map((p) => String(p.problemId)));
    const byTopic = {};
    for (const topic of topics) byTopic[String(topic._id)] = [];
    for (const problem of problems) {
      const key = String(problem.topicId);
      if (!byTopic[key]) byTopic[key] = [];
      byTopic[key].push({
        ...problem,
        completed: doneSet.has(String(problem._id)),
      });
    }

    const sheet = topics.map((topic) => {
      const list = byTopic[String(topic._id)] || [];
      return {
        ...topic,
        problems: list,
        total: list.length,
        completedCount: list.filter((p) => p.completed).length,
      };
    });

    const totalProblems = problems.length;
    const totalCompleted = doneSet.size;

    res.set("Cache-Control", "private, no-store");
    return res.json({
      sheet,
      stats: {
        totalTopics: topics.length,
        totalProblems,
        totalCompleted,
        percent: totalProblems ? Math.round((totalCompleted / totalProblems) * 100) : 0,
      },
    });
  } catch (err) {
    console.error("sheet error", err);
    return res.status(500).json({ message: "Could not load DSA sheet" });
  }
});

module.exports = router;
