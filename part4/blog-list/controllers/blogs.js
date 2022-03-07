const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const validateUser = require("../middleware/validateUser");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator", {
    name: 1,
    username: 1,
  });
  response.status(200).json(blogs);
});

blogsRouter.post("/", validateUser, async (request, response) => {
  const blog = new Blog(request.body);
  blog.creator = request.user._id;

  if (!blog.title && !blog.url) return response.status(400).end();
  if (!blog.likes) {
    blog.likes = 0;
  }
  const newBlog = await blog.save();
  return response.status(201).json({ newBlog });
});

blogsRouter.delete("/:id", validateUser, async (req, res) => {
  const blogCreator = await Blog.findById(req.params.id).populate("creator", {username: 1});
  if (req.user.username !== blogCreator.username) {
    return res
      .status(403)
      .json({
        error: "The user is not permitted to remove blogs from other users",
      });
  }
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
    return res.status(404).end();
  }

  return res.status(204).json({ blog });
});

blogsRouter.put("/:id", async (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog._id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
    new: true,
  });
  if (!updatedBlog) {
    return res.status(404).end();
  }

  return res.status(200).json({ updatedBlog });
});

module.exports = blogsRouter;
