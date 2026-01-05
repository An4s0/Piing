import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt";
import { usersService } from "@/services";
import type { IUser } from "@piing/types";

export const AuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw "MISSING_TOKEN";

    const decoded = verifyToken(token);
    if (!decoded) throw "TOKEN_INVALID";

    const user = (await usersService.find({
      id: decoded.id,
    })) as IUser | null;
    if (!user) throw "USER_NOT_FOUND";

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;
    next();
  } catch (error) {
    next(error);
  }
};
