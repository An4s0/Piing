export const GlobalErrors = {
  INTERNAL_SERVER_ERROR: {
    message: "An unexpected error occurred.",
    statusCode: 500,
  },

  INVALID_CONTENT_TYPE: {
    message: "Invalid content type. Expected application/json.",
    statusCode: 415,
  },

  ROUTE_NOT_FOUND: {
    message: "Requested resource not found.",
    statusCode: 404,
  },

  TOO_MANY_REQUESTS: {
    message: "Too many requests. Please try again later.",
    statusCode: 429,
  },

  VALIDATION_ERROR: {
    message: "Invalid input data.",
    statusCode: 400,
  },
} as const;
