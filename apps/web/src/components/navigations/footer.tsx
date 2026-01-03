import { GithubIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl h-10 px-4 flex items-center justify-between">
        <p className="text-sm text-muted">
          A gentle reminder, right when it matters.
        </p>

        <Link
          to="https://github.com/An4s0/piing"
          target="_blank"
          aria-label="Piing on GitHub"
          className="
            text-subtle
            hover:text-text
          "
        >
          <GithubIcon className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}
