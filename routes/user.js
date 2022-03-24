const router = require("express").Router();
const { registerValidation, loginValidation } = require("../validation");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verify = require("./verifyToken");

router.post("/register", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST")
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    plataform: req.body.plataform,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST")
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email not found");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid Password");
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ user: user, accessToken: token });
});

router.get("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET")
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).send("Not found");
  }
  res.send(user);
});

router.put("/:id", verify, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT")
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(400).send("Email not found");
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    foundUser.password
  );
  if (!validPassword) {
    return res.status(400).send("Invalid Password");
  }
  if (req.params.id !== req.user._id) {
    return res.status(400).send("Unauthorized");
  }
  const conditions = { _id: req.params.id };
  const updateParams = {
      username: req.body.username,
      email: req.body.email,
      plataform: req.body.plataform,
      img: req.body.img,
      description: req.body.description,
      likedGames:req.body.likedGames
  }
  try {
    const updateUser = await User.updateOne(conditions, updateParams);
    if (!updateUser) {
      return res.status(404).send("Not found");
    }
    return res.status(200).send(updateUser);
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;
