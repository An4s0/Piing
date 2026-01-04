import { MainLayout } from "@/components/layouts";
import { useTitle } from "@/hooks";
import { Link } from "react-router-dom";
import { Plus, Clock, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui";

type Reminder = {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  completed: boolean;
};

const REMINDERS: Reminder[] = [
  // Sample
  {
    id: "1",
    title: "Project deadline",
    description: "Submit final presentation to team",
    time: "6:00 PM",
    date: "Today",
    completed: false,
  },
  {
    id: "2",
    title: "Pay internet bill",
    description: "Monthly payment due",
    time: "9:00 AM",
    date: "Tomorrow",
    completed: false,
  },
  {
    id: "3",
    title: "Doctor appointment",
    description: "Annual checkup",
    time: "4:30 PM",
    date: "Yesterday",
    completed: true,
  },
  {
    id: "4",
    title: "Team meeting",
    description: "Weekly sync",
    time: "2:00 PM",
    date: "Friday",
    completed: false,
  },
];

export default function RemindersPage() {
  useTitle("Piing | Reminders");

  const upcoming = REMINDERS.filter((r) => !r.completed);
  const past = REMINDERS.filter((r) => r.completed);

  const hasReminders = REMINDERS.length > 0;

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
              <ReminderCard reminder={r} key={r.id} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-subtle">Past</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((r) => (
              <ReminderCard reminder={r} key={r.id} isPast />
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
}: {
  reminder: Reminder;
  isPast?: boolean;
}) {
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
        {reminder.date} · {reminder.time}
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
          className={`rounded-lg px-3 py-2 bg-bgltr text-xs font-medium hover:text-danger ${
            isPast ? "flex-1 flex justify-center" : ""
          }`}
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
