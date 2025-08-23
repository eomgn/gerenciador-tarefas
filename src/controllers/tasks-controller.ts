import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export class TasksController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({
      message: "create tasks",
    });
  }
}
