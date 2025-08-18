import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export class TeamMembersController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({ message: "team member ok!!!" });
  }
}
