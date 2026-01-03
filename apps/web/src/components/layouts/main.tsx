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

      <main className={"flex-1 mx-auto max-w-5xl px-4 py-6 " + className}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
