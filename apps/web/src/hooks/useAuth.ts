import { useEffect, useState } from "react";
import type { IUser } from "@piing/types";
import { auth } from "@/utils/auth";
import { cookies } from "@/utils/cookies";
import { storageUser } from "@/utils/storage";

export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const token = cookies.get("token");

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchMe = async () => {
      const response = await auth.me(token);
      setUser(response.data?.user ?? null);

      if (response.error) {
        cookies.remove("token");
        storageUser.remove();
        setUser(null);
      }

      setLoading(false);
    };

    fetchMe();
  }, [token]);

  return {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
  };
}
