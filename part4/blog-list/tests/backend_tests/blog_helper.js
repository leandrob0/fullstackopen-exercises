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

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "me",
    url: "",
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id;
};

module.exports = {
  initialBlogs,
  nonExistingId
};
