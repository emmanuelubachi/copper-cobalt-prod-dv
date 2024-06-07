import FilterButton from "@/components/elements/filterButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <div className="absolute left-4 top-4 z-40 sm:left-6 sm:top-[60px]">
        <FilterButton />
      </div>
      {children}
    </main>
  );
}
