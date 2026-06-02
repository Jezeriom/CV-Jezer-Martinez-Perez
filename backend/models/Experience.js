const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  startDate: Date,
  endDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
