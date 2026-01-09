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
    // Validate Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("INVALID_AUTH_HEADER");
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = verifyToken(token) as { id: string };
    if (!decoded?.id) {
      throw new Error("TOKEN_INVALID");
    }

    // Fetch user from database
    const user = (await usersService.find({
      id: decoded.id,
    })) as IUser | null;
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    // Remove sensitive fields
    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;
    next();
  } catch (error) {
    next(error);
  }
};
