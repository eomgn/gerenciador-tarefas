import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import zod from "zod";
import { Roles } from "@/enums/roles.enum";

export class UsersRolesController {
  // ### UPDATE
  async update(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      role: zod.enum(Roles),
    });

    const { role } = bodySchema.parse(request.body);

    // ----- capturando parametro passado na rota -----
    const { id } = request.params;

    // ---- verificando se o 'id' passado no parametro da rota é um existentes no banco na tabela 'users'
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("User not existes", 404);
    }

    // ----- passando atualizacao de status para o banco -----
    const userRoleUpdate = await prisma.user.update({
      where: { id },
      data: {
        role: role,
      },
    });

    return response.status(200).json(userRoleUpdate);
  }
}
