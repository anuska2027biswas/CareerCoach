const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    AtsScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);