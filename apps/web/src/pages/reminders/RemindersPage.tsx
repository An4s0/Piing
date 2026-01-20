import { useEffect, useState, useRef } from "react";
import { MainLayout } from "@/components/layouts";
import { useTitle } from "@/hooks";
import { Link } from "react-router-dom";
import { Plus, Clock, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui";
import type { IReminder } from "@piing/types";
import { reminders } from "@/utils/reminders";
import { useAuth } from "@/hooks/useAuth";

export default function RemindersPage() {
  useTitle("Piing | Reminders");
  const { token } = useAuth();
  const fetchedRef = useRef(false);

  const [REMINDERS, setREMINDERS] = useState<IReminder[]>([]);

  useEffect(() => {
    if (!token || fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchReminders = async () => {
      const response = await reminders.get(token);
      if (response.error) return;
      setREMINDERS(response.data?.reminders ?? []);
    };

    fetchReminders();
  }, [token]);

  const upcoming = REMINDERS.filter((r) => !r.completed);
  const past = REMINDERS.filter((r) => r.completed);

  const hasReminders = REMINDERS.length > 0;

  async function fetchRemindersAgain() {
    if (!token) return;
    const response = await reminders.get(token);
    if (!response.error) {
      setREMINDERS(response.data?.reminders ?? []);
    }
  }

  async function remove(reminderId: string) {
    if (!token) return;

    setREMINDERS((prev) => prev.filter((r) => r.id !== reminderId));

    const response = await reminders.delete(reminderId, token);

    if (response.error) {
      await fetchRemindersAgain();
    }
  }

  return (
    <MainLayout className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
          <p className="text-subtle mt-1">
            {upcoming.length} upcoming • {past.length} past
          </p>
        </div>

        <Link to="/reminders/new">
          <Button>
            <Plus className="h-4 w-4" />
            New
          </Button>
        </Link>
      </div>

      {upcoming.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Upcoming</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((r) => (
              <ReminderCard key={r.id} reminder={r} onDelete={remove} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-subtle">Past</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((r) => (
              <ReminderCard reminder={r} key={r.id} onDelete={remove} isPast />
            ))}
          </div>
        </section>
      )}

      {!hasReminders && (
        <div className="rounded-xl bg-bglt p-12 text-center border border-border">
          <div className="mx-auto bg-bgltr w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-subtle" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No reminders yet</h3>
          <p className="text-subtle text-sm mb-6">
            Create your first reminder to get started
          </p>
        </div>
      )}
    </MainLayout>
  );
}

function ReminderCard({
  reminder,
  isPast = false,
  onDelete,
}: {
  reminder: IReminder;
  isPast?: boolean;
  onDelete: (id: string) => void;
}) {
  function formatScheduledAt(value: string | Date) {
    const d = new Date(value);

    const date = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const time = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${date} · ${time}`;
  }

  return (
    <div
      className={`group relative rounded-xl bg-bglt p-5 border border-border hover:shadow-lg ${
        isPast ? "opacity-65" : ""
      }`}
    >
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100">
        {reminder.completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5 text-subtle" />
        )}
      </div>

      <div className="inline-flex items-center bg-bgltr text-subtle gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-3">
        <Clock className="h-3 w-3" />
        {formatScheduledAt(reminder.scheduled_at)}
      </div>

      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-lg leading-tight">
          {reminder.title}
        </h3>
        {reminder.description && (
          <p className="text-sm line-clamp-2 text-subtle">
            {reminder.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
        {!isPast && (
          <Link
            to={`/reminders/${reminder.id}`}
            className="flex-1 text-center bg-bgltr rounded-lg px-3 py-2 text-xs font-medium hover:opacity-80"
          >
            Edit
          </Link>
        )}
        <button
          className={`rounded-lg px-3 py-2 bg-bgltr text-xs font-medium hover:text-danger cursor-pointer ${
            isPast ? "flex-1 flex justify-center" : ""
          }`}
          aria-label="Delete"
          onClick={() => onDelete(reminder.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
