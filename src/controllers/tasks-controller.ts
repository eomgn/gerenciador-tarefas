import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { AppError } from "@/utils/AppError";

export class TasksController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      title: zod.string().min(3),
      description: zod.string().min(3),
      status: zod.string(),
      priority: zod.string(),
      assigned_to: zod.string(),
      team_id: zod.string(),
    });

    const { title, description, status, priority, assigned_to, team_id } =
      bodySchema.parse(request.body);

    return response.json({
      message: "create tasks",
    });
  }
}
