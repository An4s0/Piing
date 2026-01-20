import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/loading";
import { ProtectedRoute } from "@/ProtectedRoute";

export default function AppRoutes() {
  const NotFoundPage = React.lazy(
    () => import("./pages/not-found/NotFoundPage"),
  );
  const HomePage = React.lazy(() => import("./pages/home/HomePage"));
  const RemindersPage = React.lazy(
    () => import("./pages/reminders/RemindersPage"),
  );
  const NewReminderPage = React.lazy(
    () => import("./pages/reminders/NewReminderPage"),
  );
  const EditReminderPage = React.lazy(
    () => import("./pages/reminders/EditReminderPage"),
  );
  const SignUpPage = React.lazy(() => import("./pages/auth/SignUpPage"));
  const SignInPage = React.lazy(() => import("./pages/auth/SignInPage"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <RemindersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminders/new"
          element={
            <ProtectedRoute>
              <NewReminderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminders/:id"
          element={
            <ProtectedRoute>
              <EditReminderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
