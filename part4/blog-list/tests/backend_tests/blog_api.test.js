const mongoose = require("mongoose");
const connectDb = require("../../utils/mongo");
const supertest = require("supertest");
const helper = require("./blog_helper");
const app = require("../../app");

const Blog = require("../../models/blog");

const api = supertest(app);

// This deletes every blog already in the db, and inserts the ones defined in the helper module before all the test.
beforeEach(async () => {
  connectDb();
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promise = blogObjects.map((blog) => blog.save());
  await Promise.all(promise);
}, 100000);

describe("Blog tests", () => {
  test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("Blogs array is of the right length", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  }, 100000);

  test("Blog post working", async () => {
    const newBlog = {
      title: "Cacona",
      author: "Me",
      url: "",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
    const blogsDb = await api.get("/api/blogs");
    expect(blogsDb.body).toHaveLength(helper.initialBlogs.length + 1);

  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});
