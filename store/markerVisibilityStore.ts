import { create } from "zustand";

interface MarkerVisibilityState {
  showActiveMarkers: boolean;
  showInactiveMarkers: boolean;
  toggleActiveMarkers: () => void;
  toggleInactiveMarkers: () => void;
}

const useMarkerVisibilityStore = create<MarkerVisibilityState>((set) => ({
  showActiveMarkers: false,
  showInactiveMarkers: false,
  toggleActiveMarkers: () =>
    set((state) => ({ showActiveMarkers: !state.showActiveMarkers })),
  toggleInactiveMarkers: () =>
    set((state) => ({ showInactiveMarkers: !state.showInactiveMarkers })),
}));

export default useMarkerVisibilityStore;
