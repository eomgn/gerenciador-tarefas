import { Request, Response, NextFunction } from "express";

export class SessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    return response.json({ message: "session initialized" });
  }
}
