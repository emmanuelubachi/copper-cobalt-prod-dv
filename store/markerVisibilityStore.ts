import { create } from "zustand";

type MarkerVisibilityState = {
  isActiveSiteMarkersVisible: boolean;
  isInactiveSiteMarkersVisible: boolean;

  isProcessingEntiteMarkerVisible: boolean;

  isInternationalRouteVisible: boolean;
  isBorderPostVisible: boolean;
  isExportPortVisible: boolean;
  isSocioEconomicVisible: boolean;
  isEnvironmentalImpactVisible: boolean;
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

  toggleSocioEconomic: () => void;

  toggleEnvironmentalImpact: () => void;
};

const useMarkerVisibilityStore = create<
  MarkerVisibilityState & MarkerVisibilityActions
>((set) => ({
  // active sites
  isActiveSiteMarkersVisible: true,
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
  isProcessingEntiteMarkerVisible: true,
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

  // socio economic
  isSocioEconomicVisible: false,
  toggleSocioEconomic: () =>
    set((state) => ({
      isSocioEconomicVisible: !state.isSocioEconomicVisible,
    })),

  // environmental impact
  isEnvironmentalImpactVisible: false,
  toggleEnvironmentalImpact: () =>
    set((state) => ({
      isEnvironmentalImpactVisible: !state.isEnvironmentalImpactVisible,
    })),
}));

export default useMarkerVisibilityStore;
