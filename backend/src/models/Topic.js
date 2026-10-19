const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    order: { type: Number, required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
