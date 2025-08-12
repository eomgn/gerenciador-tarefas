import { Router } from "express";
const routes = Router();

// arquivos de rotas
import { usersRoutes } from "@/routes/users-routes";

// rotas
routes.use("/users", usersRoutes);

export { routes };
