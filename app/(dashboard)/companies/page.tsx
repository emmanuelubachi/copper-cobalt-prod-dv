import React from "react";
import BackButton from "@/components/elements/backButton";
import GridList from "@/components/sections/gridList";

export default function Page() {
  return (
    <main className="mb-24 mt-0 flex-col space-y-4 p-4 sm:mb-20 sm:mt-0 sm:px-6 sm:py-3">
      <header className="sm:ml-1">
        <h1 className="text-h4 font-medium tracking-tight">Select a project</h1>
      </header>

      {/* <div className="flex">
        <BackButton />
      </div> */}
      <GridList />
    </main>
  );
}
