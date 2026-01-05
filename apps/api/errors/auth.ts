export const AuthErrors = {
  MISSING_TOKEN: {
    code: "MISSING_TOKEN",
    message: "Authentication token is missing.",
    statusCode: 401,
  },

  TOKEN_INVALID: {
    code: "TOKEN_INVALID",
    message: "Authentication token is invalid.",
    statusCode: 401,
  },

  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    message: "Authentication token has expired.",
    statusCode: 401,
  },

  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "You are not authorized to access this resource.",
    statusCode: 403,
  },
} as const;
