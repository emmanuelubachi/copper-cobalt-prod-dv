import React from "react";

import GridList from "@/app/(dashboard)/companies/components/gridList";
import { CompaniesList } from "@/constants/application";

export default function Page() {
  return (
    <main>
      <header className="left-0 right-0 z-20 bg-white p-4 dark:bg-neutral-900 sm:px-8">
        <h1 className="text-center text-h5 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h5">
          Mining Companies in the Democratic Republic of the Congo
        </h1>
      </header>

      <section className="mb-24 mt-0 flex-col space-y-4 px-4 sm:mb-20 sm:mt-0 sm:px-8">
        <GridList data={CompaniesList} />
      </section>
    </main>
  );
}
