import type { IUser } from "@piing/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
