export const ValidationErrors = {
  VALIDATION_ERROR: {
    message: "Invalid input data.",
    statusCode: 400,
  },

  REQUIRED_FIELD_MISSING: {
    message: "A required field is missing.",
    statusCode: 400,
  },
} as const;
