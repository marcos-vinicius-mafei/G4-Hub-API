const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    max: 255,
  },
  email: {
    type: "string",
    required: true,
    max: 255,
    unique: true
  },
  password: {
    type: "string",
    required: true,
    max: 1024,
  },
  plataform: {
    type: "string",
    required: true,
    max: 200,
  },
  img: {
    type: "string",
    default: "https://i.imgur.com/CGv8oZ7.png",
  },
  description: {
    type: "string",
    default: "Olá eu estou usando o G4Hub!",
  },
  likedGames: {
      type: "array",
      default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
