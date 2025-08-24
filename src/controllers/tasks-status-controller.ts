import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma";
import { TasksStatus } from "@/enums/tasks-status.enum";
import { AppError } from "@/utils/AppError";

export class TasksStatusController {
  async update(request: Request, response: Response, next: NextFunction) {
    const statusSchema = zod.object({
      status: zod.enum(TasksStatus),
    });

    const { status } = statusSchema.parse(request.body);

    //  ----- recuperando 'id' passado como parametro na rota -----
    const { id } = request.params;

    // ----- verificando se o user autenticado esta tentando editar uma task atribuida a ele -----
    const task = await prisma.tasks.findFirst({
      where: {
        id: id,
        assigned_to: request.user?.id,
      },
    });

    if (!task) {
      throw new AppError("You do not have permission to update this task", 404);
    }

    //  ----- atualizando registro -----
    await prisma.tasks.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    return response.json();
  }
}
