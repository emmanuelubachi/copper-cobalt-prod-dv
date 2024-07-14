import { create } from "zustand";

type MarkerVisibilityState = {
  showActiveSiteMarkers: boolean;
  showInactiveSiteMarkers: boolean;
  showProcessingEntiteMarkers: boolean;
};

type MarkerVisibilityActions = {
  toggleActiveSiteMarkers: () => void;
  toggleInactiveSiteMarkers: () => void;
  toggleProcessingEntiteMarkers: () => void;
};

const useMarkerVisibilityStore = create<
  MarkerVisibilityState & MarkerVisibilityActions
>((set) => ({
  showActiveSiteMarkers: false,
  showInactiveSiteMarkers: false,
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
