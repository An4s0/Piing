export const DatabaseErrors = {
  FIND_ONE_REQUIRES_CONDITION: {
    message: "At least one condition must be provided to find a single record.",
    statusCode: 400,
  },

  CREATE_REQUIRES_DATA: {
    message: "At least one field must be provided to create a record.",
    statusCode: 400,
  },

  UPDATE_REQUIRES_DATA: {
    message: "At least one field must be provided to update a record.",
    statusCode: 400,
  },

  DELETE_REQUIRES_ID: {
    message: "An ID must be provided to delete a record.",
    statusCode: 400,
  },
} as const;
