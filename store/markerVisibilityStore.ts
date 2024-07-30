import { create } from "zustand";

type MarkerVisibilityState = {
  isActiveSiteMarkersVisible: boolean;
  isInactiveSiteMarkersVisible: boolean;
  isProcessingEntiteMarkerVisible: boolean;
  isInternationalRouteVisible: boolean;
  isBorderPostVisible: boolean;
  isExportPortVisible: boolean;
};

type MarkerVisibilityActions = {
  toggleActiveSiteMarkers: () => void;
  showActiveSiteMarkers: () => void;
  closeActiveSiteMarkers: () => void;

  toggleInactiveSiteMarkers: () => void;
  showInactiveSiteMarkers: () => void;
  closeInactiveSiteMarkers: () => void;

  toggleProcessingEntiteMarkers: () => void;

  toggleInternationalRoute: () => void;
  showInterationalRoute: () => void;
  hideInternationalRoute: () => void;

  toggleBorderPost: () => void;

  toggleExportPort: () => void;
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
  isProcessingEntiteMarkerVisible: false,
  toggleProcessingEntiteMarkers: () =>
    set((state) => ({
      isProcessingEntiteMarkerVisible: !state.isProcessingEntiteMarkerVisible,
    })),

  // international routes
  isInternationalRouteVisible: false,
  toggleInternationalRoute: () =>
    set((state) => ({
      isInternationalRouteVisible: !state.isInternationalRouteVisible,
    })),
  showInterationalRoute: () => set({ isInternationalRouteVisible: true }),
  hideInternationalRoute: () => set({ isInternationalRouteVisible: false }),

  // border posts
  isBorderPostVisible: false,
  toggleBorderPost: () =>
    set((state) => ({
      isBorderPostVisible: !state.isBorderPostVisible,
    })),

  // export port
  isExportPortVisible: false,
  toggleExportPort: () =>
    set((state) => ({
      isExportPortVisible: !state.isExportPortVisible,
    })),
}));

export default useMarkerVisibilityStore;
