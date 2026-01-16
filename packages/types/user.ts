export type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash?: string;
  is_verified: boolean;
  verification_expires_at: Date | null;
  created_at: Date;
};
