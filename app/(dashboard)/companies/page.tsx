import React from "react";

import GridList from "@/app/(dashboard)/companies/components/gridList";
import { CompaniesList } from "@/constants/application";

export default function Page() {
  return (
    <main className="mb-24 mt-0 flex-col space-y-4 p-4 sm:mb-20 sm:mt-0 sm:px-8 sm:py-3">
      <header className="rounded-lg bg-background py-4 dark:bg-neutral-900">
        <h1 className="text-center text-h4 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h4">
          Mining Companies in the Democratic Republic of the Congo
        </h1>
      </header>

      <GridList data={CompaniesList} />
    </main>
  );
}
