import { Router } from "express";
const teamMemberRoutes = Router();

// controller
import { TeamMembersController } from "@/controllers/team-members-controller";
const teamMembersController = new TeamMembersController();

// middlewares

// rotas
teamMemberRoutes.post("/", teamMembersController.create);

export { teamMemberRoutes };
