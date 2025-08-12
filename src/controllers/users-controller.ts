import { Request, Response, NextFunction } from "express";

export class UsersController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({
      message: "Usuário criado.",
    });
  }
}
