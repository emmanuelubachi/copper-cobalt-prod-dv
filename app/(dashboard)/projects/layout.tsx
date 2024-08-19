import React from "react";

import FilterButton from "@/components/elements/filterButton";
import ProjectFilter from "./projectFilter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative xl:flex">
      <aside className="absolute hidden h-screen xl:sticky xl:top-0 xl:block">
        <ProjectFilter />
      </aside>

      <div className="min-h-screen w-full">{children}</div>
    </main>
  );
}
