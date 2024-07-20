import { create } from "zustand";

type DetailsState = {
  // initial state
  isMapDetailsOpen: boolean;
  mapDetailsDrawerContent: React.ReactNode; // New state for dynamic content

  // map state
  selectedSite: string | null;
};

type DetailsActions = {
  toggleDetails: () => void;
  setMapDetailsContent: (content: React.ReactNode) => void; // Function to set dynamic content
  openMapDetails: () => void;
  closeMapDetails: () => void;

  setSelectedSite: (site: string | null) => void;
};

const useMapDetailsStore = create<DetailsState & DetailsActions>((set) => ({
  // initial state
  isMapDetailsOpen: false,
  mapDetailsDrawerContent: null,
  toggleDetails: () =>
    set((state) => ({ isMapDetailsOpen: !state.isMapDetailsOpen })),

  setMapDetailsContent: (content) => set({ mapDetailsDrawerContent: content }),

  openMapDetails: () => set({ isMapDetailsOpen: true }),
  closeMapDetails: () =>
    set({ isMapDetailsOpen: false, mapDetailsDrawerContent: null }),

  selectedSite: null,
  setSelectedSite: (site) => set({ selectedSite: site }),
}));

export default useMapDetailsStore;
