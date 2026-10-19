const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
      index: true,
    },
    youtubeUrl: { type: String, default: "" },
    practiceUrl: { type: String, default: "" },
    articleUrl: { type: String, default: "" },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

problemSchema.index({ topicId: 1, order: 1 });

module.exports = mongoose.model("Problem", problemSchema);
