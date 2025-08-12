import { Request, Response, NextFunction } from "express";

//  AppError
import { AppError } from "@/utils/AppError";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    // cada error gerado pela instância de AppError retornando então o status e mensagem passada
    return response.status(error.statusCode).json({ message: error.message });
  }

  // erro generico, são sendo uma instancia de AppError
  return response.status(500).json({ message: error.message });
}
