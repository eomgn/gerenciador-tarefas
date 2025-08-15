import express from "express";
import { errorHandling } from "@/middlewares/error-handling";
import { notFoundRequest } from "./middlewares/not-found-request";

// configurando express
const app = express();
app.use(express.json()); // configurando express para utilizar o json()

// rotas
import { routes } from "@/routes/index";

// utilizando rotas
app.use(routes);

// utilizando error handling
app.use(errorHandling);

// route not found
app.use(notFoundRequest);

export { app };
