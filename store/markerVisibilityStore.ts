import { create } from "zustand";

type MarkerVisibilityState = {
  isActiveSiteMarkersVisible: boolean;
  isInactiveSiteMarkersVisible: boolean;
  showProcessingEntiteMarkers: boolean;
};

type MarkerVisibilityActions = {
  toggleActiveSiteMarkers: () => void;
  showActiveSiteMarkers: () => void;
  closeActiveSiteMarkers: () => void;

  toggleInactiveSiteMarkers: () => void;
  showInactiveSiteMarkers: () => void;
  closeInactiveSiteMarkers: () => void;

  toggleProcessingEntiteMarkers: () => void;
};

const useMarkerVisibilityStore = create<
  MarkerVisibilityState & MarkerVisibilityActions
>((set) => ({
  // active sites
  isActiveSiteMarkersVisible: false,
  toggleActiveSiteMarkers: () =>
    set((state) => ({
      isActiveSiteMarkersVisible: !state.isActiveSiteMarkersVisible,
    })),
  showActiveSiteMarkers: () => set({ isActiveSiteMarkersVisible: true }),
  closeActiveSiteMarkers: () => set({ isActiveSiteMarkersVisible: false }),

  // inactive sites
  isInactiveSiteMarkersVisible: false,
  toggleInactiveSiteMarkers: () =>
    set((state) => ({
      isInactiveSiteMarkersVisible: !state.isInactiveSiteMarkersVisible,
    })),
  showInactiveSiteMarkers: () => set({ isInactiveSiteMarkersVisible: true }),
  closeInactiveSiteMarkers: () => set({ isInactiveSiteMarkersVisible: false }),

  // processing entities
  showProcessingEntiteMarkers: false,
  toggleProcessingEntiteMarkers: () =>
    set((state) => ({
      showProcessingEntiteMarkers: !state.showProcessingEntiteMarkers,
    })),
}));

export default useMarkerVisibilityStore;
