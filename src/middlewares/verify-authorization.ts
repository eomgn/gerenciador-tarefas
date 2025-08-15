import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { Roles } from "@/enums/roles.enum";

export function verifyAuthorization(allowedRoles: Roles[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    //----- tipando para aceitar só valores do enum Roles -----
    const roles = request.user?.role as Roles;

    // ----- verificando se o usuário existe, se não tiver usuário no request, significa que ninguém está autenticado -----
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    // ----- verificando se a role passada na chamada da função é uma role válida de acordo com o enum na criação da table -----
    if (!allowedRoles.includes(roles)) {
      throw new AppError("Unauthorized", 401);
    }

    //  ----- next para caso passar nas validações a execução segue para o próximo middleware ou controller -----
    next();
  };
}
