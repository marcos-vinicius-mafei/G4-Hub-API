const router = require("express").Router();
const Grade = require("../model/Grade");
const User = require("../model/User");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).send("user not found");
  }
  const grade = new Grade({
    slug: req.body.slug,
    grade: req.body.grade,
    userId: req.user._id,
  });
  const found = await Grade.findOne({
    userId: req.user._id,
    slug: req.body.slug,
  });
  if (found) {
    const conditions = { userId: req.user._id, slug: req.body.slug };
    const updateParams = {
        grade: req.body.grade
    };
    try {
      const updatedGrade = await Grade.updateOne(conditions, updateParams);
      res.status(200).send(updatedGrade);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      const savedGrade = grade.save();
      res.status(200).send(savedGrade);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.get("/:slug", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  const grade = await Grade.find({ slug: req.params.slug });
  res.status(200).send(grade);
});

module.exports = router;
