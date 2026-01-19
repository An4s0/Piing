export const UserErrors = {
  INVALID_CREDENTIALS: {
    message: "Email or password is incorrect.",
    statusCode: 401,
  },

  EMAIL_ALREADY_EXISTS: {
    message: "Email already exists.",
    statusCode: 409,
  },

  USER_CREATION_FAILED: {
    message: "Failed to create user.",
    statusCode: 500,
  },

  USER_UPDATE_FAILED: {
    message: "Failed to update user.",
    statusCode: 500,
  },

  USER_DELETE_FAILED: {
    message: "Failed to delete user.",
    statusCode: 500,
  },
} as const;
