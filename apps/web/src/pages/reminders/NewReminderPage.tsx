import { useState } from "react";
import { MainLayout } from "@/components/layouts";
import { Input, Button, Textarea } from "@/components/ui";
import { createReminderSchema } from "@piing/validation";
import { reminders } from "@/utils/reminders";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function NewReminderPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    scheduled_at: "", // datetime-local
  });

  const { token } = useAuth();

  const update = (k: keyof typeof data) => (v: string) =>
    setData((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!data.scheduled_at) {
      setError("Date and time are required");
      return;
    }

    // local datetime to UTC ISO
    const payload = {
      ...data,
      scheduled_at: new Date(data.scheduled_at).toISOString(),
    };

    const validationResult = createReminderSchema.safeParse(payload);
    if (!validationResult.success) {
      const flat = validationResult.error.flatten();
      setError(
        flat.formErrors[0] ??
          Object.values(flat.fieldErrors)[0]?.[0] ??
          "Invalid form data",
      );
      return;
    }

    const result = await reminders.create(payload, token as string);

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
            New Reminder
          </h1>
          <p className="text-sm text-subtle">Create a new reminder.</p>
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
            onChange={(e) => update("title")(e.target.value)}
            placeholder="Reminder title"
          />

          <Textarea
            onChange={(e) => update("description")(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
          />

          <div className="space-y-1">
            <label className="text-xs text-muted">Date & Time</label>
            <Input
              onChange={(e) => update("scheduled_at")(e.target.value)}
              type="datetime-local"
            />
          </div>

          <Button type="submit" className="w-full">
            Create Reminder
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}
