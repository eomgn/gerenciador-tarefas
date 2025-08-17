import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { TokenPayload } from "@/utils/ITokenPayload";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization; // recuperando Authorization

    // ----- verificando se existe uma Authorization -----
    if (!authHeader) {
      throw new AppError("JWT Token is not found", 401);
    }

    // ----- desestruturando para remover o Bearer -----
    const [bearer, token] = authHeader.split(" ");

    // ----- validando token através da chave secreta definida no 'authConfig' -----
    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 401);
  }
}
