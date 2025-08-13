import { Request, Response, NextFunction } from "express";

import zod from "zod";

export class UsersController {
  create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      name: zod.string().trim().min(3),
      email: zod.email(),
      password: zod.string().min(3),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    return response.json({
      message: "Usuário criado.",
    });
  }
}
