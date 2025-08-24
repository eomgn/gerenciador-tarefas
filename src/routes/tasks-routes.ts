import { Router } from "express";
const tasksRouter = Router();

// enums
import { Roles } from "@/enums/roles.enum";

// controllers
import { TasksController } from "@/controllers/tasks-controller";
const tasksController = new TasksController();

import { TasksStatusController } from "@/controllers/tasks-status-controller";
const tasksStatusController = new TasksStatusController();

import { TasksPriorityController } from "@/controllers/tasks-priority-controller";
const tasksPriorityController = new TasksPriorityController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // autenticacao
import { verifyAuthorization } from "@/middlewares/verify-authorization"; // autorização

// rotas
tasksRouter.post(
  "/",
  ensureAuthenticated,
  verifyAuthorization([Roles.ADMIN]),
  tasksController.create
);

tasksRouter.put(
  "/:id",
  ensureAuthenticated,
  verifyAuthorization([Roles.ADMIN]),
  tasksController.update
);

tasksRouter.patch(
  "/status/:id",
  ensureAuthenticated,
  verifyAuthorization([Roles.ADMIN, Roles.MEMBER]),
  tasksStatusController.update
);

tasksRouter.patch(
  "/priority/:id",
  ensureAuthenticated,
  verifyAuthorization([Roles.ADMIN, Roles.MEMBER]),
  tasksPriorityController.update
);

export { tasksRouter };
