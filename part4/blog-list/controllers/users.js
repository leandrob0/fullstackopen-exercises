const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Registers a user
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const foundUser = await User.find({ username: username });
  if (foundUser.length !== 0)
    return res.status(400).json({ error: "Username already exists" });
  if (username === undefined || password === undefined)
    return res
      .status(400)
      .json({ error: "Both username and Password fields must be filled." });
  if (username.length < 3 || password.length < 3)
    return res.status(400).json({
      error: "Username and password must be at least 3 characters long.",
    });

  const user = new User({
    username: username,
    name: name,
  });

  const hashedPw = await bcrypt.hash(password, 10);
  user.password = hashedPw;

  const newUser = await user.save();
  res.status(201).json(newUser);
});

// Logs in a user
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, "secret");
  res.status(200).send({ token, username: user.username, name: user.name });
});

// Gets all users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}, { username: 1, name: 1 }).populate("blogs");
  res.status(200).json(users);
});

module.exports = usersRouter;
