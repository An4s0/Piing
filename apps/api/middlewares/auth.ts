import type { Request, Response, NextFunction } from "express";
import { usersService, sessionsService } from "@/services";
import { verifyToken } from "@/utils/jwt";

export const AuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    // Validate Authorization header and extract Bearer token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("INVALID_AUTH_HEADER");
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      throw new Error("TOKEN_INVALID");
    }

    const session = await sessionsService.findOne({ token });
    if (!session) {
      throw new Error("SESSION_NOT_FOUND");
    }

    // Verify and decode JWT token
    const decoded = verifyToken(token) as { id?: string };

    if (!decoded?.id) {
      throw new Error("TOKEN_INVALID");
    }

    // Retrieve authenticated user from database
    const user = await usersService.findOne({
      id: decoded.id,
    });

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // Remove sensitive fields before attaching user to request
    const { password_hash, ...safeUser } = user;

    req.user = safeUser;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
