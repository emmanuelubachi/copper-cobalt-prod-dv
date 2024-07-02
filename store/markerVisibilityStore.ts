import { create } from "zustand";

interface MarkerVisibilityState {
  showActiveSiteMarkers: boolean;
  showInactiveSiteMarkers: boolean;
  showProcessingEntiteMarkers: boolean;

  toggleActiveSiteMarkers: () => void;
  toggleInactiveSiteMarkers: () => void;
  toggleProcessingEntiteMarkers: () => void;
}

const useMarkerVisibilityStore = create<MarkerVisibilityState>((set) => ({
  showActiveSiteMarkers: true,
  showInactiveSiteMarkers: true,
  showProcessingEntiteMarkers: false,

  toggleActiveSiteMarkers: () =>
    set((state) => ({ showActiveSiteMarkers: !state.showActiveSiteMarkers })),
  toggleInactiveSiteMarkers: () =>
    set((state) => ({
      showInactiveSiteMarkers: !state.showInactiveSiteMarkers,
    })),
  toggleProcessingEntiteMarkers: () =>
    set((state) => ({
      showProcessingEntiteMarkers: !state.showProcessingEntiteMarkers,
    })),
}));

export default useMarkerVisibilityStore;
