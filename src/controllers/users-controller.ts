import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { IUser } from "@/utils/IUser";
import { Roles } from "@/enums/roles.enum";

export class UsersController {
  // ### CREATE
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

    // ----- removendo exibição de senha na resposta (userWithoutPassword = Usuario sem a Senha)
    const { password: _, ...userWithoutPassword } = user;

    return response.json(userWithoutPassword);
  }

  // ### INDEX
  async index(request: Request, response: Response, next: NextFunction) {
    // ----- capturando todos os usuários utilizando o 'prisma' -----
    const users = await prisma.user.findMany();

    // ----- removendo 'password' -----
    const usersWithoutPassword = users.map(({ password, ...users }) => users);

    return response.status(200).json(usersWithoutPassword);
  }

  // ### UPDATE
  async update(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      name: zod.string().min(3).optional(),
      email: zod.email().optional(),
      password: zod.string().min(3).optional(),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    // ----- criando uma hash NOVA para password -----
    let hashPassword: String | undefined;
    if (password) {
      hashPassword = await hash(password, 8);
    }

    // ----- desestruturando 'request.user' que é criado quando o usuário esta logado (session) s-----
    const { id: user_id, role } = request.user as IUser;

    // ----- verificando 'role' para atualizar o próprio usuario se não for ADMIN e se for poder definir quem atualizar passando id no parametro da rota -----
    const targetUserId = role === Roles.ADMIN ? request.params.id : user_id;

    // ----- verificando se a role é 'member' para não ser possivel atualizar outro 'user' alem do proprio -----
    if (role === Roles.MEMBER && request.params.id !== user_id) {
      throw new AppError("You are not allowed to update another user", 403);
    }

    // ----- criando um objeto com os dados atualizados  -----
    const dataToUpdate: any = {
      name,
      email,
      hashPassword,
    };

    // ----- atualizando registro -----
    const userUpdate = await prisma.user.update({
      where: { id: targetUserId },
      data: dataToUpdate,
      select: { name: true, email: true },
    });

    return response.json(userUpdate);
  }
}
