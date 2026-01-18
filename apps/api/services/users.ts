import type { IUser } from "@piing/types";
import { BaseService } from "./base";

class UsersService extends BaseService<IUser> {
  constructor() {
    super("users");
  }
}

export const usersService = new UsersService();
