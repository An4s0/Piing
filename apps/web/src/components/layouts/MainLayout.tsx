import { Header, Footer } from "../navigations";

export function MainLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className={"flex-1 py-6 px-4 max-w-5xl w-full mx-auto " + className}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
