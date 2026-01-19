import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { storageUser } from "@/utils/storage";

export function Header() {
  const user = storageUser.get();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg">
      <div className="mx-auto max-w-5xl h-16 px-4 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/piing.png" alt="Piing logo" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-text">
            Piing
          </span>
        </Link>

        <Link to={user ? "/reminders" : "/signup"}>
          <Button>{user ? "Reminders" : "Sign up"}</Button>
        </Link>
      </div>
    </header>
  );
}
