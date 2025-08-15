import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class TeamsController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      name: zod.string().min(3),
      description: zod.string(),
    });

    const { name, description } = bodySchema.parse(request.body);

    // ----- verificando se já existe um time com o mesmo 'name' passado no corpo da requisição -----
    const teamAlreadyName = await prisma.team.findFirst({ where: { name } });

    if (teamAlreadyName) {
      throw new AppError("This name is already in use");
    }

    // ----- cadastrando novo team -----
    const team = await prisma.team.create({
      data: {
        name,
        description,
      },
    });

    return response.json(team);
  }
}
