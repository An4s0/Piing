import type { IReminder, ApiResponse } from "@piing/types";

export const reminders = {
  async create(
    data: {
      title: string;
      description?: string;
      scheduled_at: string;
    },
    token: string,
  ) {
    const response = await fetch(import.meta.env.VITE_API_URL + "/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as ApiResponse<{
      reminder: IReminder;
    }>;
    return result;
  },

  async get(token: string) {
    const response = await fetch(import.meta.env.VITE_API_URL + "/reminders", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result = (await response.json()) as ApiResponse<{
      reminders: IReminder[];
    }>;
    return result;
  },

  async delete(reminderId: string, token: string) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/reminders/" + reminderId,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const result = (await response.json()) as ApiResponse<{}>;
    return result;
  },

  async update(
    reminderId: string,
    data: {
      title?: string;
      description?: string;
      scheduled_at?: string;
    },
    token: string,
  ) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/reminders/" + reminderId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const result = (await response.json()) as ApiResponse<{
      reminder: IReminder;
    }>;

    return result;
  },
};
