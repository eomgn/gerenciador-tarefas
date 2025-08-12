import express from "express";

const app = express();

app.use(express.json()); // configurando express para utilizar o json()

// rotas
import { routes } from "@/routes/index";

// utilizando rotas
app.use(routes);

export { app };
