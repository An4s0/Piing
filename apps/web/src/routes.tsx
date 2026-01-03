import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  const HomePage = React.lazy(() => import("./pages/home/page"));

  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
