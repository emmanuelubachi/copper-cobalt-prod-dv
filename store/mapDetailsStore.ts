import { create } from "zustand";

type DetailsState = {
  isMapDetailsOpen: boolean;
  mapDetailsDrawerContent: React.ReactNode; // New state for dynamic content

  toggleDetails: () => void;
  setMapDetailsContent: (content: React.ReactNode) => void; // Function to set dynamic content

  openMapDetails: () => void;
  closeMapDetails: () => void;
};

const useMapDetailsStore = create<DetailsState>((set) => ({
  // initial state
  isMapDetailsOpen: false,
  mapDetailsDrawerContent: null,
  toggleDetails: () =>
    set((state) => ({ isMapDetailsOpen: !state.isMapDetailsOpen })),

  setMapDetailsContent: (content) => set({ mapDetailsDrawerContent: content }),

  openMapDetails: () => set({ isMapDetailsOpen: true }),
  closeMapDetails: () =>
    set({ isMapDetailsOpen: false, mapDetailsDrawerContent: null }),
}));

export default useMapDetailsStore;
