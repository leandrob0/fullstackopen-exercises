const User = require("../../models/user");

const initialUsers = [
  {
    username: "patricky",
    password: "doorsofstone",
    name: "Patrick Rothfuss",
  },
  {
    username: "brandini",
    password: "book6",
    name: "Brandon Sanderson",
  },
  {
    username: "idontknow",
    password: "iknowless",
    name: "It's me man",
  },
];

const nonExistingId = async () => {
  const user = new User({
    username: "idontknow",
    password: "iknowless",
    name: "It's me man",
  });
  await user.save();
  await user.remove();

  return user._id;
};

module.exports = {
  initialUsers,
  nonExistingId,
};
