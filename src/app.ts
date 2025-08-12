import express from "express";

// error handling
import { errorHandling } from "@/middlewares/error-handling";

// configurando express
const app = express();
app.use(express.json()); // configurando express para utilizar o json()

// rotas
import { routes } from "@/routes/index";

// utilizando rotas
app.use(routes);

// utilizando error handling
app.use(errorHandling);

export { app };
