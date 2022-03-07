const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String, required: true },
  url: { type: String },
  likes: { type: Number },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Blog", blogSchema);
