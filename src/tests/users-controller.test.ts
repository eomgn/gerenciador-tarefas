import request from "supertest";

import { app } from "@/app";

describe("UsersController", () => {
  // criando teste
  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "mgnteste",
      email: "mgntestse@email.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
  });
});
