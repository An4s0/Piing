export const UserErrors = {
  USER_NOT_FOUND: {
    message: "User not found.",
    statusCode: 404,
  },

  EMAIL_ALREADY_EXISTS: {
    message: "Email already exists.",
    statusCode: 409,
  },

  INVALID_CREDENTIALS: {
    message: "Email or password is incorrect.",
    statusCode: 401,
  },

  USER_NOT_VERIFIED: {
    message: "User email is not verified.",
    statusCode: 403,
  },

  FAILED_TO_CREATE_USER: {
    message: "Failed to create user.",
    statusCode: 500,
  },
} as const;
