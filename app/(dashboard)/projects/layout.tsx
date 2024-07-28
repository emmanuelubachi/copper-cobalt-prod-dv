import React from "react";

import FilterButton from "@/components/elements/filterButton";
import ProjectFilter from "./projectFilter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <div className="absolute left-4 top-4 z-20 sm:left-7 sm:top-4">
        <FilterButton
          content={<ProjectFilter />}
          label="Projects"
          type="tooltip"
          tooltip="Select a project"
        />
      </div>
      {children}
    </main>
  );
}
