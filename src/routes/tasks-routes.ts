import { Router } from "express";
const tasksRouter = Router();

// controllers
import { TasksController } from "@/controllers/tasks-controller";
const tasksController = new TasksController();

// middlewares

// rotas
tasksRouter.post("/", tasksController.create);

export { tasksRouter };
