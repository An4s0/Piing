import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border">
      <div className="mx-auto max-w-5xl h-16 px-4 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/piing.png" alt="Piing logo" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-text">
            Piing
          </span>
        </Link>

        <Link
          to={"/signup"}
          className="
            px-5 py-2 text-sm font-medium rounded-md
            bg-primary text-white
            hover:bg-primary-hover
          "
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
