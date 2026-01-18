export const OTPErrors = {
  OTP_NOT_FOUND: {
    message: "OTP not found.",
    statusCode: 404,
  },

  OTP_CREATION_FAILED: {
    message: "Failed to create otp.",
    statusCode: 500,
  },

  OTP_DELETE_FAILED: {
    message: "Failed to delete otp.",
    statusCode: 500,
  },
} as const;
