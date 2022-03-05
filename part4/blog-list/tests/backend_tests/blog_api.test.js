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
});

describe("Post operations", () => {
  test("returns 201 on every field filled correctly", async () => {
    const newBlog = {
      title: "Cacona",
      author: "Me",
      url: "",
      likes: 12
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
    const blogsDb = await api.get("/api/blogs");
    expect(blogsDb.body).toHaveLength(helper.initialBlogs.length + 1);

  }, 100000);

  test("Blog posts without likes and likes started at 0", async () => {
    const newBlog = {
      title: "Cacona",
      author: "Me",
      url: ""
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
    const blogsDb = await api.get("/api/blogs");
    const likes = blogsDb.body[blogsDb.body.length - 1].likes;
    expect(likes).toEqual(0);

  }, 100000);

  test("Blog returns 400 without title and url", async () => {
    const newBlog = {
      author: "Me",
      likes: 200
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

  }, 100000);
});

describe("delete operations", () => {
  test("single blog deleted and returns 204", async () => {
    const beforeBlogs = await Blog.find({});
    const beforeLength = beforeBlogs.length - 1;

    await api
      .delete(`/api/blogs/${beforeBlogs[beforeLength]._id}`)
      .expect(204)

    
    const afterBlogs = await Blog.find({});

    expect(afterBlogs).toHaveLength(helper.initialBlogs.length - 1);

    const titles = afterBlogs.map(blog => blog.title);
    expect(titles).not.toContain(beforeBlogs[beforeLength].title);

  }, 100000);

  test("single blog returns 404 if id doesn't exist", async () => {
    const id = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)

  }, 100000)
})

afterAll(() => {
  mongoose.connection.close();
});
