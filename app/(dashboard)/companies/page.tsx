import React from "react";

import GridList from "@/app/(dashboard)/companies/components/gridList";
import { CompaniesList } from "@/constants/application";
import { ShareButton } from "@/components/elements/shareButton";

export default function Page() {
  return (
    <main>
      <header className="left-0 right-0 z-20 flex items-start justify-between gap-4 bg-background/50 px-2 py-4 backdrop-blur-md dark:bg-neutral-900/50 sm:px-8 sm:py-6">
        <h1 className="text-start text-h5 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h5">
          Mining Companies in the Democratic Republic of the Congo
        </h1>
        <div className="flex justify-end">
          <ShareButton />
        </div>
      </header>

      <section className="mb-24 mt-0 flex-col space-y-4 px-2 sm:mb-20 sm:mt-0 sm:px-8">
        <GridList data={CompaniesList} />
      </section>
    </main>
  );
}
