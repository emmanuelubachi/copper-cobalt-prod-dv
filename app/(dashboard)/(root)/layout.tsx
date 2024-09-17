import FilterButton from "@/components/elements/filterButton";
import MapFilter from "./components/mapFilter";
import { ShareButton } from "@/components/elements/shareButton";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <div className="absolute left-2 top-4 z-20 space-x-1 sm:left-7 sm:top-4 sm:space-x-2">
        <FilterButton
          content={<MapFilter defaultValue="mining-activities" />}
          label="Mining Activities"
          type="button"
        />
        <FilterButton
          content={<MapFilter defaultValue="additional-information" />}
          label="Additional Information"
          type="button"
        />
      </div>
      <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
        <ShareButton className="__muted absolute right-2 top-4 z-20 sm:right-7 sm:top-4" />
      </Suspense>

      {children}
    </main>
  );
}
