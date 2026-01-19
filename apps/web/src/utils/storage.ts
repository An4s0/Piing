import type { IUser } from "@piing/types";

const USER_KEY = "piing_user";

export const storageUser = {
  set(user: IUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  get(): IUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as IUser) : null;
  },

  remove() {
    localStorage.removeItem(USER_KEY);
  },
};
