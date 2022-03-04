const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if(!blog.title && !blog.url) response.status(400).end();
  if(!blog.likes) {
    blog.likes = 0;
  }
  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

module.exports = blogsRouter;
