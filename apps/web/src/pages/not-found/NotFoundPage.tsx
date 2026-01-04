import { MainLayout } from "@/components/layouts";
import { Button } from "@/components/ui";
import { useTitle } from "@/hooks";
import { Link } from "react-router-dom";

export default function NotFound() {
  useTitle("Piing | Page Not Found");

  return (
    <MainLayout className="flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-semibold tracking-tight">404</h1>

        <p className="text-subtle text-lg">This page doesn’t exist.</p>

        <Link to="/">
          <Button className="px-8 py-3 text-base">Go home</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
