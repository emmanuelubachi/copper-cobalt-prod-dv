import React from "react";

import FilterButton from "@/components/elements/filterButton";
import ProjectFilter from "./components/project-filter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative xl:flex">
      {/* <aside className="absolute z-20 hidden bg-background pt-6 lg:top-0 xl:fixed xl:flex">
        <div className="">
          <ProjectFilter />
        </div>
      </aside> */}

      <div className="min-h-screen w-full">{children}</div>
    </main>
  );
}
