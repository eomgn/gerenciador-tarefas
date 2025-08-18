import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import zod from "zod";
import { AppError } from "@/utils/AppError";

export class TeamMembersController {
  // ### CREATE
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = zod.object({
      user_id: zod.uuid(),
      team_id: zod.uuid(),
    });

    const { user_id, team_id } = bodySchema.parse(request.body);

    // ----- verificando se o 'user_id' realmente existe no banco de dados, ou seja se o usuario existe -----
    const userExists = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new AppError("Users not exists", 404);
    }

    // ----- verificando se o 'team_id' realmente existe no banco de dados, ou seja se o team existe -----
    const teamExists = await prisma.team.findUnique({
      where: { id: team_id },
    });

    if (!teamExists) {
      throw new AppError("Team not exists", 404);
    }

    // ----- verificando se o 'user_id' passado no corpo já está no mesmo 'team_id' -----
    const teamsMembers = await prisma.teamMember.findFirst({
      where: {
        userId: user_id,
        teamId: team_id,
      },
    });

    if (teamsMembers) {
      throw new AppError("User already registered on this team ", 404);
    }

    // ----- realizando registro de um 'user' especifico a um 'team' especifico ----
    const teamMemberRegister = await prisma.teamMember.create({
      data: {
        userId: user_id,
        teamId: team_id,
      },
    });

    return response.status(201).json(teamMemberRegister);
  }

  // ### DELETE
  async delete(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = zod.object({
      user: zod.uuid(),
      team: zod.uuid(),
    });

    const { user: user_id, team: team_id } = paramsSchema.parse(request.params);

    await prisma.teamMember.delete({
      where: {
        userId_teamId: {
          userId: user_id,
          teamId: team_id,
        },
      },
    });

    return response.json({ message: "delete" });
  }

  // ### INDEX
  async index(request: Request, response: Response, next: NextFunction) {
    const teams = await prisma.teamMember.findMany({
      select: {
        id: true,
        user: { select: { name: true, email: true } },
        team: { select: { name: true, description: true } },
      },
    });

    return response.json(teams);
  }
}
