import FilterButton from "@/components/elements/filterButton";
import MapFilter from "./components/mapFilter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <div className="absolute left-4 top-4 z-20 space-x-2 sm:left-7 sm:top-4">
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
      {children}
    </main>
  );
}
