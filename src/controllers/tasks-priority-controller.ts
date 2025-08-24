import { Request, Response, NextFunction } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma";
import { TasksPriority } from "@/enums/tasks-priority.enum";
import { AppError } from "@/utils/AppError";

export class TasksPriorityController {
  async update(request: Request, response: Response, next: NextFunction) {
    const prioritySchema = zod.object({
      priority: zod.enum(TasksPriority),
    });

    const { priority } = prioritySchema.parse(request.body);

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
        priority,
      },
      where: {
        id,
      },
    });

    return response.json();
  }
}
