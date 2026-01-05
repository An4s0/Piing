export const ReminderErrors = {
  REMINDER_NOT_FOUND: {
    code: "REMINDER_NOT_FOUND",
    message: "Reminder not found.",
    statusCode: 404,
  },

  REMINDER_CREATION_FAILED: {
    code: "REMINDER_CREATION_FAILED",
    message: "Failed to create reminder.",
    statusCode: 500,
  },

  REMINDER_UPDATE_FAILED: {
    code: "REMINDER_UPDATE_FAILED",
    message: "Failed to update reminder.",
    statusCode: 500,
  },

  REMINDER_DELETE_FAILED: {
    code: "REMINDER_DELETE_FAILED",
    message: "Failed to delete reminder.",
    statusCode: 500,
  },

  REMINDER_ALREADY_COMPLETED: {
    code: "REMINDER_ALREADY_COMPLETED",
    message: "Reminder is already completed.",
    statusCode: 400,
  },
} as const;
