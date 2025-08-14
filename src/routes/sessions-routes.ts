import { Router } from "express";
const sessionsRoutes = Router();

// controllers
import { SessionsController } from "@/controllers/sessions-controller";
const sessionsController = new SessionsController();

// middlewares
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // middle de autenticacao

sessionsRoutes.use(ensureAuthenticated);

// routes
sessionsRoutes.post("/", sessionsController.create);

export { sessionsRoutes };
