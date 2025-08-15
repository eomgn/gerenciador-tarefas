import { Router } from "express";
const teamsRoutes = Router();

// controllers
import { TeamsController } from "@/controllers/teams-controller";
const teamsController = new TeamsController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
teamsRoutes.use(ensureAuthenticated);

// routes
teamsRoutes.post("/", teamsController.create);

export { teamsRoutes };
