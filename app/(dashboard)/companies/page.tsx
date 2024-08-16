import React from "react";
// import {  } from "lucide-react";

import BackButton from "@/components/elements/backButton";
import GridList from "@/app/(dashboard)/companies/components/gridList";
import { CompaniesList } from "@/constants/application";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="mb-24 mt-0 flex-col space-y-4 p-4 sm:mb-20 sm:mt-0 sm:px-6 sm:py-3">
      <header className="rounded-lg bg-white px-4 py-6 dark:bg-muted">
        <h1 className="text-h4 font-medium tracking-tight">
          Mining Companies in the Democratic Republic of the Congo
        </h1>
      </header>

      <GridList data={CompaniesList} />
    </main>
  );
}
