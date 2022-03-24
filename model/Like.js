const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  slug: {
    type: "string",
    max: 255,
  },
  gameLiked:{
      type: "object",
  },
  userId: {
    type: "string",
    unique: false,
    max: 200,
  }
});

module.exports = mongoose.model("Like", likeSchema);
