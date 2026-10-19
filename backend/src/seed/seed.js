require("dotenv").config();
const mongoose = require("mongoose");
const { connectDb } = require("../config/db");
const Topic = require("../models/Topic");
const Problem = require("../models/Problem");
const sheet = require("../data/dsaSheet");

async function seed() {
  await connectDb();

  await Problem.deleteMany({});
  await Topic.deleteMany({});

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

  const topicCount = await Topic.countDocuments();
  const problemCount = await Problem.countDocuments();
  console.log(`Seeded ${topicCount} topics and ${problemCount} problems`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
