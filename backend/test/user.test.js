const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // Assuming index.js exports the app
const User = require("../db");

describe("User API Tests", () => {
  beforeAll(async () => {
    // Use a test database
    await mongoose.connect("mongodb://localhost:27017/testdb");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear users before each test
    await User.deleteMany({});
  });

  it("should signup a user", async () => {
    const response = await request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User"
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user created successfully");
    expect(response.body.token).toBeDefined();
  });

  it("should signin a user", async () => {
    // First signup
    await request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User"
      });

    // Then signin
    const response = await request(app)
      .post("/api/v1/user/signin")
      .send({
        username: "test@example.com",
        password: "password123"
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("signin successful");
    expect(response.body.token).toBeDefined();
  });

  it("should update user info", async () => {
    // Signup and get token
    const signupRes = await request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User"
      });
    const token = signupRes.body.token;

    // Update
    const response = await request(app)
      .put("/api/v1/user/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Updated"
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user updated successfully");
  });
});