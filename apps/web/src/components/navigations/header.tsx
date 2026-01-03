export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-5xl h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/piing.png" alt="Piing logo" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-text">
            Piing
          </span>
        </div>

        <button
          className="
            px-5 py-2 text-sm font-medium rounded-md
            bg-primary text-white
            hover:bg-primary-hover
          "
        >
          Sign up
        </button>
      </div>
    </header>
  );
}
