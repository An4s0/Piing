import { MainLayout } from "@/components/layouts";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <MainLayout className="flex items-center justify-center">
      <div className="text-center space-y-4">
        
        <h1 className="text-7xl font-semibold tracking-tight">
          404
        </h1>

        <p className="text-subtle text-lg">
          This page doesn’t exist.
        </p>

        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            px-6 py-2 text-base font-medium rounded-md
            bg-primary text-white
            hover:bg-primary-hover
          "
        >
          Go home
        </Link>

      </div>
    </MainLayout>
  );
}
