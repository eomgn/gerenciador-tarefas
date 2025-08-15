import { Router } from "express";
const routes = Router();

// arquivos de rotas
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { teamsRoutes } from "./teams-routes";

// rotas
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/teams", teamsRoutes);

export { routes };
