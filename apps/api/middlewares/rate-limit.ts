import type { NextFunction, Request, Response } from "express";

const MAX_REQUESTS = 500;
const WINDOW_SIZE = 15 * 60 * 1000;
const rateLimitMap: Map<string, { count: number; startTime: number }> =
  new Map();

export const RateLimiter = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const ip: string =
    req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";
  const currentTime = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    next();
    return;
  }

  const rateLimitData = rateLimitMap.get(ip)!;

  if (currentTime - rateLimitData.startTime > WINDOW_SIZE) {
    rateLimitData.count = 1;
    rateLimitData.startTime = currentTime;
    next();
    return;
  }

  if (rateLimitData.count < MAX_REQUESTS) {
    rateLimitData.count++;
    next();
  } else {
    throw "TOO_MANY_REQUESTS";
  }
};
