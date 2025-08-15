import { Request, RequestHandler, Response } from "express";

export const notFoundRequest: RequestHandler = (
  request: Request,
  response: Response
) => {
  response.status(404).json({ message: "Route not found" });
};
