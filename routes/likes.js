const router = require("express").Router();
const Like = require("../model/Like");
const User = require("../model/User");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).send("user not found");
  }

  const like = new Like({
    slug: req.body.slug,
    gameLiked: req.body.gameLiked,
    userId: req.user._id,
  });
  const found = await Like.findOne({
    slug: req.body.slug,
    userId: req.user._id,
  });
  if (found) {
    try {
      const removed = await Like.remove({
        slug: req.body.slug,
        userId: req.user._id,
      });
      res.send(removed);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      const saved = await like.save();
      res.send(saved);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.get("/user/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");

  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const like = await Like.find({ userId: req.params.id });
  res.status(200).send({
    user: user,
    likedGames: like,
  });
});

router.delete("/game/:slug", verify, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).send("user not found");
  }
  try {
    const likes = await Like.remove({
      userId: req.user._id,
      slug: req.params.slug,
    });
    res.send(likes);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
