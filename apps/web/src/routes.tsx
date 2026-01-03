import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/loading";

export default function AppRoutes() {
  const NotFoundPage = React.lazy(() => import("./pages/404/page"));
  const HomePage = React.lazy(() => import("./pages/home/page"));
  const SignUpPage = React.lazy(() => import("./pages/auth/signup"));
  const SignInPage = React.lazy(() => import("./pages/auth/signin"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
