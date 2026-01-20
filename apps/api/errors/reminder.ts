export const ReminderErrors = {
  REMINDER_NOT_FOUND: {
    message: "Reminder not found.",
    statusCode: 404,
  },

  REMINDER_CREATION_FAILED: {
    message: "Failed to create reminder.",
    statusCode: 500,
  },

  REMINDER_UPDATE_FAILED: {
    message: "Failed to update reminder.",
    statusCode: 500,
  },

  REMINDER_DELETE_FAILED: {
    message: "Failed to delete reminder.",
    statusCode: 500,
  },

  CRON_REMINDERS_ERROR: {
    message: "Failed to process reminder cron job.",
    statusCode: 500,
  },
} as const;
