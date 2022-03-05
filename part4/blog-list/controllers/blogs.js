const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if(!blog.title && !blog.url) return response.status(400).end();
  if(!blog.likes) {
    blog.likes = 0;
  }
  const newBlog = await blog.save();
  return response.status(201).json({newBlog});
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if(!blog) {
    return res.status(404).end();
  }

  return res.status(204).json({blog});
})

blogsRouter.put("/:id", async (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog._id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {new: true});
  if(!updatedBlog) {
    return res.status(404).end()
  }

  return res.status(200).json({updatedBlog});
})

module.exports = blogsRouter;
