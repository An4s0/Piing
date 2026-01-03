import { MainLayout } from "@/components/layouts";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <MainLayout className="flex items-center">
      <div className="mx-auto max-w-2xl px-4 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          One reminder.
          <br />
          Right on time.
        </h1>

        <p className="text-subtle text-lg">
          Piing reminds you of one important thing — exactly when it matters.
        </p>

        <div>
          <Link
            to={"/reminders/new"}
            className="
            px-8 py-3 text-base font-medium rounded-md
            bg-primary text-white
            hover:bg-primary-hover
          "
          >
            Set a reminder
          </Link>
        </div>

        <p className="text-muted text-sm">No clutter. Just timely reminders.</p>
      </div>
    </MainLayout>
  );
}
