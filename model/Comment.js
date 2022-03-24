const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: "string",
    required: true,
    unique: false,
    max: 255,
  },
  gameName: {
    type: "string",
    max: 255,
    unique: false,
  },
  gameSlug: {
    type: "string",
    unique: false,
    max: 1024,
  },
  userId: {
    type: "string",
    unique: false,
    max: 200,
  },
  likes: {
    type: "number",
    unique: false,
    default: 0,
  },
  usefullPost: {
    type: "number",
    unique: false,
    default:0,
  },
  whoLiked: {
      type: "array",
      unique: false,
      default: [],
  },
  user: {
    type: "object",
    unique: false
  }
});

module.exports = mongoose.model("Comment", commentSchema);
