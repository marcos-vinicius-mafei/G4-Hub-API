const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  slug: {
    type: "string",
    max: 255,
  },
  grade:{
      type: "number",
  },
  userId: {
    type: "string",
    unique: false,
    max: 200,
  }
});

module.exports = mongoose.model("Grade", gradeSchema);
