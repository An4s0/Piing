import type { IUser, ApiResponse } from "@piing/types";

export const auth = {
  async signup(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = (await response.json()) as ApiResponse<{ user: IUser }>;
    return result;
  },

  async signin(data: { email: string; password: string }) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = (await response.json()) as ApiResponse<{ user: IUser }>;
    return result;
  },

  async verifyOtp(data: { code: string; user_id: string }) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = (await response.json()) as ApiResponse<{
      user: IUser;
      token: string;
    }>;
    return result;
  },

  async me(token: string) {
    const response = await fetch(import.meta.env.VITE_API_URL + "/auth/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const result = (await response.json()) as ApiResponse<{
      user: IUser;
      token: string;
    }>;
    return result;
  },
};
