const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String, required: true },
  url: { type: String },
  likes: { type: Number },
});

module.exports = mongoose.model("Blog", blogSchema);
