import { create } from "zustand";

type FilterState = {
  isFilterOpen: boolean;
  filterDrawerContent: React.ReactNode; // New state for dynamic content

  toggleFilter: () => void;
  setFilterContent: (content: React.ReactNode) => void; // Function to set dynamic content

  openFilter: () => void;
  closeFilter: () => void;
};

const useFilterStore = create<FilterState>((set) => ({
  isFilterOpen: false,
  filterDrawerContent: null,
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  setFilterContent: (content) => set({ filterDrawerContent: content }),
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false, filterDrawerContent: null }),
}));

export default useFilterStore;
