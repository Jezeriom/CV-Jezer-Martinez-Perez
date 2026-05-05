const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  description: String,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model("Experience", ExperienceSchema);