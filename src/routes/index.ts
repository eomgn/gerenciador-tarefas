import { Router } from "express";
const routes = Router();

// arquivos de rotas
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { teamsRoutes } from "./teams-routes";
import { teamMemberRoutes } from "@/routes/team-member-routes";

// rotas
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/teams", teamsRoutes);
routes.use("/team-members", teamMemberRoutes);

export { routes };
