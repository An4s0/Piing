import type { Request, Response, NextFunction } from "express";
import { ZodError } from "@piing/validation";
import {
  UserErrors,
  GlobalErrors,
  AuthErrors,
  SessionErrors,
  ReminderErrors,
  ValidationErrors,
} from "@/errors";
import { normalizeErrors } from "@/utils/normalize-errors";

export const allErrors = {
  ...normalizeErrors(UserErrors),
  ...normalizeErrors(GlobalErrors),
  ...normalizeErrors(AuthErrors),
  ...normalizeErrors(SessionErrors),
  ...normalizeErrors(ReminderErrors),
  ...normalizeErrors(ValidationErrors),
} as const;

type KnownErrorKey = keyof typeof allErrors;

const sendError = (
  res: Response,
  code: KnownErrorKey,
  fields?: Record<string, string>
) => {
  const e = allErrors[code];

  const response = {
    success: false,
    data: null,
    error: {
      code,
      message: e.message,
      ...(fields && { fields }),
    },
  };

  return res.status(e.statusCode).json(response);
};

export function ErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  /* Zod validation */
  if (err instanceof ZodError) {
    const fields: Record<string, string> = {};

    err.issues.forEach((issue) => {
      const key = issue.path.length ? issue.path.join(".") : "general";
      fields[key] = issue.message;
    });

    return sendError(res, "VALIDATION_ERROR", fields);
  }

  /* Known app errors */
  if (
    (typeof err === "string" || err instanceof Error) &&
    err.toString() in allErrors
  ) {
    return sendError(res, err.toString() as KnownErrorKey);
  }

  /* Dev logging */
  if (process.env.NODE_ENV === "development") {
    console.error("\x1b[31m✖ Error caught:\x1b[0m", err);
  }

  return sendError(res, "INTERNAL_SERVER_ERROR");
}
