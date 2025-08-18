import { Router } from "express";
const teamMemberRoutes = Router();

// enums
import { Roles } from "@/enums/roles.enum";

// controller
import { TeamMembersController } from "@/controllers/team-members-controller";
const teamMembersController = new TeamMembersController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
teamMemberRoutes.use(ensureAuthenticated);

import { verifyAuthorization } from "@/middlewares/verify-authorization";

// rotas
teamMemberRoutes.post(
  "/",
  verifyAuthorization([Roles.ADMIN]),
  teamMembersController.create
);

export { teamMemberRoutes };
