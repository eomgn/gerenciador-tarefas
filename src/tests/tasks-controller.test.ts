import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "@/app";
import { Roles } from "@/enums/roles.enum";
import { authConfig } from "@/configs/auth";

describe("TasksController", () => {
  // criando teste
  it("should create a new task successfully", async () => {
    const token = jwt.sign(
      {
        sub: "7ad62f7b-70d8-4915-8fd3-5fcc203095b6", // user_id
        role: Roles.ADMIN, // precisa ser ADMIN pra passar no verifyAuthorization
      },
      authConfig.jwt.secret as string
    );

    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Desenvolver sistema Front-End",
        description: "Criar telas para o sistema.",
        assigned_to: "7ad62f7b-70d8-4915-8fd3-5fcc203095b6",
        team_id: "af80265f-e676-4db6-adf3-cdbbc8a34376",
      });

    expect(response.status).toBe(200);
  });
});
