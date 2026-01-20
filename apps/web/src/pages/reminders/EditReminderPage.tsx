import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layouts";
import { Input, Button, Textarea } from "@/components/ui";
import { updateReminderSchema } from "@piing/validation";
import { reminders } from "@/utils/reminders";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import type { IReminder } from "@piing/types";

export default function EditReminderPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState({
    title: "",
    description: "",
    scheduled_at: "", // datetime-local
  });

  const { token } = useAuth();

  function toDatetimeLocal(value: string | Date) {
    const d = new Date(value);
    const offset = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - offset);
    return local.toISOString().slice(0, 16);
  }

  const update = (k: keyof typeof data) => (v: string) =>
    setData((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (!id || !token) return;

    const load = async () => {
      const res = await reminders.get(token);
      if (res.error) {
        setError(res.error.message);
        return;
      }

      const reminder = res.data?.reminders.find((r: IReminder) => r.id === id);
      if (!reminder) {
        setError("Reminder not found");
        return;
      }

      setData({
        title: reminder.title,
        description: reminder.description ?? "",
        scheduled_at: toDatetimeLocal(reminder.scheduled_at),
      });
    };

    load();
  }, [id, token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!id) return;

    const payload = {
      title: data.title || undefined,
      description: data.description || undefined,
      scheduled_at: data.scheduled_at
        ? new Date(data.scheduled_at).toISOString()
        : undefined,
    };

    const validationResult = updateReminderSchema.safeParse(payload);
    if (!validationResult.success) {
      const flat = validationResult.error.flatten();
      setError(
        flat.formErrors[0] ??
          Object.values(flat.fieldErrors)[0]?.[0] ??
          "Invalid form data",
      );
      return;
    }

    const normalizedData = {
      ...(validationResult.data.title !== undefined && {
        title: validationResult.data.title,
      }),

      ...(validationResult.data.description !== undefined && {
        description: validationResult.data.description ?? undefined,
      }),

      ...(validationResult.data.scheduled_at !== undefined && {
        scheduled_at:
          validationResult.data.scheduled_at instanceof Date
            ? validationResult.data.scheduled_at.toISOString()
            : validationResult.data.scheduled_at,
      }),
    };

    const result = await reminders.update(id, normalizedData, token as string);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    navigate("/reminders");
  }

  return (
    <MainLayout className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Reminder
          </h1>
          <p className="text-sm text-subtle">Update your reminder details.</p>
        </div>

        <div className="mb-4 rounded-md border border-border bg-bg px-3 py-2 text-xs text-muted">
          ⏰ Enter the date and time in your{" "}
          <span className="font-medium text-text">local time</span>.
          <br />
          It will be automatically converted to{" "}
          <span className="font-medium text-text">UTC</span> based on your
          location.
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && <p className="text-sm text-danger">{error}</p>}

          <Input
            value={data.title}
            onChange={(e) => update("title")(e.target.value)}
            placeholder="Reminder title"
          />

          <Textarea
            value={data.description}
            onChange={(e) => update("description")(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
          />

          <div className="space-y-1">
            <label className="text-xs text-muted">Date & Time</label>
            <Input
              value={data.scheduled_at}
              onChange={(e) => update("scheduled_at")(e.target.value)}
              type="datetime-local"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}
