export const SessionErrors = {
  OTP_REQUIRED: {
    code: "OTP_REQUIRED",
    message: "Verification code is required.",
    statusCode: 400,
  },

  OTP_INVALID: {
    code: "OTP_INVALID",
    message: "Invalid verification code.",
    statusCode: 400,
  },

  OTP_EXPIRED: {
    code: "OTP_EXPIRED",
    message: "Verification code has expired.",
    statusCode: 400,
  },

  SESSION_NOT_FOUND: {
    code: "SESSION_NOT_FOUND",
    message: "Session not found.",
    statusCode: 404,
  },

  SESSION_CREATION_FAILED: {
    code: "SESSION_CREATION_FAILED",
    message: "Failed to create session.",
    statusCode: 500,
  },
} as const;
