import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class TeamsController {
  // ### CREATE

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

  // ### UPDATE

  async update(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      name: zod.string().min(3).optional(),
      description: zod.string().optional(),
    });

    const { name, description } = bodySchema.parse(request.body);

    // ----- capturando 'id' passado como parametro na rota -----
    const { id } = request.params;

    // ----- capturando o primeiro registro encontrado no banco com o 'id' passado como parametro na rota -----
    const verifyUpdates = await prisma.team.findFirst({ where: { id } });

    // ----- verificando se existe algum registro com o 'id' passado como parametro na rota -----
    if (!verifyUpdates) {
      throw new AppError("Team not found", 404);
    }

    // ----- verificando se foi feita de fato alguma atualizacao -----
    if (
      verifyUpdates.name === name &&
      verifyUpdates.description === description
    ) {
      throw new AppError("No updates made to name or description.");
    }

    // ----- capturando 'team' de acordo com 'id' passado como parametro na rota e passando body ----
    const team = await prisma.team.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return response.json(team);
  }
}
