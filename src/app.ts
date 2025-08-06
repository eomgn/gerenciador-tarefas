import express from "express";

const app = express();

app.use(express.json()); // configurando express para utilizar o json()

export { app };
