const blogsRouter = require("./controllers/blogs");
const cors = require("cors");
require("express-async-errors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
