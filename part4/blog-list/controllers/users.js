const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Registers a user
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const user = new User({
    username: username,
    name: name,
  });

  const hashedPw = await bcrypt.hash(password, 10);
  user.password = hashedPw;

  const newUser = await user.save();
  res.status(201).json(newUser);
});

// Gets all users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}, {username: 1, name: 1});
  res.status(200).json(users);
});

module.exports = usersRouter;