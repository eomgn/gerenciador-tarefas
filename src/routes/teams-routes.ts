import { Router } from "express";
const teamsRoutes = Router();

// enums
import { Roles } from "@/enums/roles.enum";

// controllers
import { TeamsController } from "@/controllers/teams-controller";
const teamsController = new TeamsController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // autenticacao
teamsRoutes.use(ensureAuthenticated);

import { verifyAuthorization } from "@/middlewares/verify-authorization"; // autorização

// routes
teamsRoutes.post(
  "/",
  verifyAuthorization([Roles.ADMIN]),
  teamsController.create
);

export { teamsRoutes };
