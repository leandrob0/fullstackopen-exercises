const Blog = require("../../models/blog");

const initialBlogs = [
  {
    title: "Third book preview",
    author: "Patrick Rothfuss",
    url: "patrickrothfuss.com",
    likes: 100,
  },
  {
    title: "Next book ideas",
    author: "Brandon Sanderson",
    url: "brandonsanderson.com",
    likes: 469,
  },
  {
    title: "Only for test",
    author: "Leandro Bovino",
    url: "",
    likes: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
