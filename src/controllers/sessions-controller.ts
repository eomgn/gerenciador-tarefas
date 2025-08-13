import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";

export class SessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      email: zod.email(),
      password: zod.string().min(3),
    });

    const { email, password } = bodySchema.parse(request.body);

    // ----- recuperando usuário do banco de dados pelo email passado no corpo -----
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError("Invalid email or password");
    }

    // ----- comparando password passado no corpo com a do banco de dados (para isso é ideal utilizar o 'compare' do 'bcrypt') -----
    const verifyMatched = await compare(password, user.password);

    if (!verifyMatched) {
      throw new AppError("Invalid email or password");
    }

    return response.json(user);
  }
}
