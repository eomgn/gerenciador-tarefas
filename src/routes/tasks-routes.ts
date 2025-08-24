import { Router } from "express";
const tasksRouter = Router();

// enums
import { Roles } from "@/enums/roles.enum";

// controllers
import { TasksController } from "@/controllers/tasks-controller";
const tasksController = new TasksController();

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

export { tasksRouter };
