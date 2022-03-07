const mongoose = require("mongoose");
const connectDb = require("../../utils/mongo");
const supertest = require("supertest");
const helper = require("./user_helper");
const app = require("../../app");

const User = require("../../models/user");

const api = supertest(app);

// This deletes every blog already in the db, and inserts the ones defined in the helper module before all the test.
beforeEach(async () => {
  await connectDb();
  await User.deleteMany({});

  const usersObjects = helper.initialUsers.map((user) => new User(user));
  const promise = usersObjects.map((user) => user.save());
  await Promise.all(promise);
}, 100000);

describe("Registers users", () => {
  test("User registered on good operation", async () => {
    const newUser = {
      username: "anotheruser",
      password: "newuseriam",
      name: "The New User",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersInDb = await api.get("/api/users");
    expect(usersInDb.body).toHaveLength(helper.initialUsers.length + 1);
  }, 100000);

  test("returns accurate error on no username or password", async () => {
    const newUser = {
      password: "newuseriam",
      name: "The New User",
    };

    const res = await api.post("/api/users").send(newUser);
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(
      "Both username and Password fields must be filled."
    );
  }, 100000);

  test("returns accurate error on less than 3 characters username", async () => {
    const newUser = {
      username: "a",
      password: "newuseriam",
      name: "The New User",
    };

    const res = await api.post("/api/users").send(newUser);
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(
      "Username and password must be at least 3 characters long."
    );
  }, 100000);

  test("returns accurate error on existing username", async () => {
    const newUser = {
      username: "patricky",
      password: "newuseriam",
      name: "The New User",
    };

    const res = await api.post("/api/users").send(newUser);
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(
      "Username already exists"
    );
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});
