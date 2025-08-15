import { Router } from "express";
const teamsRoutes = Router();

// controllers
import { TeamsController } from "@/controllers/teams-controller";
const teamsController = new TeamsController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // autenticacao
teamsRoutes.use(ensureAuthenticated);

import { verifyAuthorization } from "@/middlewares/verify-authorization"; // autorização

// routes

teamsRoutes.post("/", verifyAuthorization(["admin"]), teamsController.create);

export { teamsRoutes };
