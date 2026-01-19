import type { IReminder } from "@piing/types";
import { BaseService } from "./base";

class RemindersService extends BaseService<IReminder> {
  constructor() {
    super("reminders");
  }
}

export const remindersService = new RemindersService();
