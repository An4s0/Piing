import type { Request, Response, NextFunction } from "express";

export const checkContentType = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.method === "GET") return next();

  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("application/json"))
    throw "INVALID_CONTENT_TYPE";

  next();
};
