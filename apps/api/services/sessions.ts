import type { ISession } from "@/types";
import { BaseService } from "./base";

class SessionsService extends BaseService<ISession> {
  constructor() {
    super("sessions");
  }
}

export const sessionsService = new SessionsService();
