import { Router } from "express";
const usersRoutes = Router();

// enums
import { Roles } from "@/enums/roles.enum";

// controllers
import { UsersController } from "@/controllers/users-controller";
const usersController = new UsersController();

import { UsersRolesController } from "@/controllers/users-roles-controller";
const usersRolesController = new UsersRolesController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // autenticacao
import { verifyAuthorization } from "@/middlewares/verify-authorization"; // autorização

// routes
usersRoutes.post("/", usersController.create);

usersRoutes.get("/", usersController.index);

usersRoutes.put("/:id", ensureAuthenticated, usersController.update);

usersRoutes.patch(
  "/role/:id",
  ensureAuthenticated,
  verifyAuthorization([Roles.ADMIN]),
  usersRolesController.update
);

export { usersRoutes };
