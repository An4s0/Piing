export type IReminder = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  scheduled_at: Date;
  completed: boolean;
  created_at: Date;
};
