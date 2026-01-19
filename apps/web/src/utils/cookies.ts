export const cookies = {
  set(name: string, value: string, days = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);

    document.cookie = [
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
      `Expires=${expires.toUTCString()}`,
      "Path=/",
      "SameSite=Lax",
    ].join("; ");
  },

  get(name: string): string | null {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");

      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(value);
      }
    }

    return null;
  },

  remove(name: string) {
    document.cookie = [
      `${encodeURIComponent(name)}=`,
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "Path=/",
      "SameSite=Lax",
    ].join("; ");
  },
};
