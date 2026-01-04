import { MainLayout } from "@/components/layouts";
import { Input, Button, Textarea } from "@/components/ui";

export default function NewReminderPage() {
  return (
    <MainLayout className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            New Reminder
          </h1>
          <p className="text-sm text-subtle">
            Create a new reminder. Date and time are in <b>UTC</b>.
          </p>
        </div>

        <div className="mb-4 rounded-md border border-border bg-bg px-3 py-2 text-xs text-muted">
          ⏰ Enter the date and time in{" "}
          <span className="font-medium text-text">UTC (Global Time)</span>.
          <br /> Make sure to convert from your local time if needed.
        </div>

        <form className="space-y-4">
          <Input placeholder="Reminder title" />

          <Textarea placeholder="Description (optional)" rows={3} />

          <div className="space-y-1">
            <label className="text-xs text-muted">Date & Time (UTC)</label>
            <Input type="datetime-local" />
          </div>

          <Button type="submit" className="w-full">
            Create Reminder
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}
