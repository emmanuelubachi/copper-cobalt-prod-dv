import React from "react";

import FilterButton from "@/components/elements/filterButton";
import GridList from "@/components/sections/gridList";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <div className="absolute left-4 top-4 z-40 sm:left-[68px] sm:top-4">
        <FilterButton content={<GridList />} />
      </div>
      {children}
    </main>
  );
}
