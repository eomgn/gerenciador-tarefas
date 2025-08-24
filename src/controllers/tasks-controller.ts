import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class TasksController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      title: zod.string().trim().min(3),
      description: zod.string(),
      assigned_to: zod.uuid().optional(),
      team_id: zod.uuid().optional(),
    });

    const { title, description, assigned_to, team_id } = bodySchema.parse(
      request.body
    );

    // ----- verificando se existe o 'assigned_to' que é o id do usuario e o 'team_id'
    if (!assigned_to) {
      throw new AppError("Member not found", 404);
    }

    if (!team_id) {
      throw new AppError("Team not found", 404);
    }

    // ----- verificando se o 'assigned_to' é um membro do 'team_id' informado -----
    const teamMember = await prisma.teamMember.findFirst({
      where: {
        teamId: team_id,
        userId: assigned_to,
      },
    });

    if (!teamMember) {
      throw new AppError("This user does not belong to this team", 404);
    }

    // ----- verificando se o 'title' já é existente ----
    const titleExists = await prisma.tasks.findFirst({
      where: { title },
    });

    if (titleExists) {
      throw new AppError("This title is already in use", 400);
    }

    // ----- cadastrando task -----
    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        assigned_to,
        team_id,
      },
    });

    return response.json(task);
  }
}
