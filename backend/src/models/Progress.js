const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    completed: { type: Boolean, default: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
