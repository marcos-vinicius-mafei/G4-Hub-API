const router = require("express").Router();
const Comment = require("../model/Comment");
const User = require("../model/User");

const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).send("user not found");
  }

  const comment = new Comment({
    text: req.body.text,
    gameName: req.body.gameName,
    gameSlug: req.body.gameSlug,
    userId: req.user._id,
    user: user,
  });
  try {
    const savedComment = await comment.save();
    res.send(savedComment);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/user/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");

  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const comment = await Comment.find({ userId: req.params.id });
  res.status(200).send({
    user: user,
    comments: comment,
  });
});

router.get("/game/:slug", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  const comment = await Comment.find({ gameSlug: req.params.slug });
  res.status(200).send(comment);
});

router.post("/:id/like", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  const comment = await Comment.findOne({ _id: req.params.id });
  const conditions = { _id: req.params.id };
  const user = await User.find({ _id: req.body.userId})
  if(!user){
    return res.status(404).send("User not found")
  }
  if (comment.whoLiked.includes(req.body.userId)) {
    const updateParams = {
      likes: comment.likes - 1,
      whoLiked: comment.whoLiked.filter((el) => el !== req.body.userId),
    };
    try {
      const updateComment = await Comment.updateOne(conditions, updateParams);
      if (!updateComment) {
        return res.status(404).send("Not found");
      }
      return res.status(200).send(updateComment);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    const updateParams = {
      likes: comment.likes + 1,
      whoLiked: [...comment.whoLiked, req.body.userId],
    };
    try {
      const updateComment = await Comment.updateOne(conditions, updateParams);
      if (!updateComment) {
        return res.status(404).send("Not found");
      }
      return res.status(200).send({updateComment:updateComment,liked: "liked"});
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.delete("/:id",verify, async (req, res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE");

  const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send("user not found");
    }
    try {
      const comment = await Comment.remove({userId: req.user._id, _id: req.params.id})
      res.send(comment);
    } catch (err) {
      res.status(400).send(err);
    }
})

module.exports = router;
