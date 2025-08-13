import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class UsersController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      name: zod.string().trim().min(3),
      email: zod.email(),
      password: zod.string().min(3),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    // ----- criando uma hash para password -----
    const hashPassword = await hash(password, 8);

    // ----- verificando se já existe um usuário com o e-mail passado no corpo da requisição -----
    const userAlreadyEmail = await prisma.user.findUnique({ where: { email } });

    if (userAlreadyEmail) {
      throw new AppError("This email is already in use");
    }

    // ----- criando um novo usuário -----
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return response.json(user);
  }
}
