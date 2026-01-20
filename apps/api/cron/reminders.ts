import cron from "node-cron";
import { remindersService, usersService } from "@/services";
import { sendReminder } from "@/utils/send-reminder";

export function startRemindersCron() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const reminders = await remindersService.findDue(now);

      for (const reminder of reminders) {
        const user = await usersService.findOne({ id: reminder.user_id });
        if (!user) continue;

        await sendReminder({
          to: user.email,
          title: reminder.title,
          description: reminder.description,
          scheduled_at: reminder.scheduled_at,
        });

        await remindersService.update(reminder.id, {
          completed: true,
        });
      }
    } catch (err) {
      console.error("CRON_REMINDERS_ERROR", err);
    }
  });
}
