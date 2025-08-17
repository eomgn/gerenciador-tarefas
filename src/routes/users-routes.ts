import { Router } from "express";
const usersRoutes = Router();

// controllers
import { UsersController } from "@/controllers/users-controller";
const usersController = new UsersController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // autenticacao
import { verifyAuthorization } from "@/middlewares/verify-authorization"; // autorização

// routes
usersRoutes.post("/", usersController.create);

usersRoutes.get("/", usersController.index);

usersRoutes.put("/:id", ensureAuthenticated, usersController.update);

export { usersRoutes };
