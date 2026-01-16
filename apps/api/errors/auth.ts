export const AuthErrors = {
  TOKEN_INVALID: {
    message: "Authentication token is invalid.",
    statusCode: 401,
  },

  // UNAUTHORIZED: {
  //   message: "You are not authorized to access this resource.",
  //   statusCode: 403,
  // },

  INVALID_AUTH_HEADER: {
    message: "Invalid authorization header format. Expected 'Bearer <token>'.",
    statusCode: 401,
  },
} as const;
