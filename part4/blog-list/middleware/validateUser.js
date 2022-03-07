const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const validateUser = async (req, res, next) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, "secret");
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  req.user =  await User.findById(decodedToken.id);
  next();
};

module.exports = validateUser;
