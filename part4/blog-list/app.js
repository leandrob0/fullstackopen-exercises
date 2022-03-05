const blogsRouter = require("./controllers/blogs");
const cors = require("cors");
require("express-async-errors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use((err, req, res) => {
  res.send(err.status).json({ error: err });
});

module.exports = app;
