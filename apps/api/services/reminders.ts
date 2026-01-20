import type { IReminder } from "@piing/types";
import { BaseService } from "./base";
import pool from "@/database";

class RemindersService extends BaseService<IReminder> {
  constructor() {
    super("reminders");
  }

  async findDue(now: Date): Promise<IReminder[]> {
    await this.init();

    const { rows } = await pool.query<IReminder>(
      `
      SELECT *
      FROM reminders
      WHERE completed = false
        AND scheduled_at <= $1
      `,
      [now],
    );

    return rows;
  }
}

export const remindersService = new RemindersService();
