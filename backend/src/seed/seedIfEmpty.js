const Topic = require("../models/Topic");
const Problem = require("../models/Problem");
const sheet = require("../data/dsaSheet");

async function seedIfEmpty() {
  const existing = await Topic.countDocuments();
  if (existing > 0) return;

  for (let i = 0; i < sheet.length; i += 1) {
    const chapter = sheet[i];
    const topic = await Topic.create({
      title: chapter.title,
      description: chapter.description,
      order: i + 1,
    });
    const docs = chapter.problems.map((p, idx) => ({
      topicId: topic._id,
      title: p.title,
      difficulty: p.difficulty,
      youtubeUrl: p.youtubeUrl,
      practiceUrl: p.practiceUrl,
      articleUrl: p.articleUrl,
      order: idx + 1,
    }));
    await Problem.insertMany(docs);
  }

  console.log("Empty database detected — DSA sheet seeded automatically.");
}

module.exports = { seedIfEmpty };
