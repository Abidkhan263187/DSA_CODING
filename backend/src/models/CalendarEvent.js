const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: { type: String, required: true }, // YYYY-MM-DD
    title: { type: String, required: true, trim: true, maxlength: 120 },
    notes: { type: String, default: "", maxlength: 1000 },
    problemIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    ],
  },
  { timestamps: true }
);

calendarEventSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model("CalendarEvent", calendarEventSchema);
