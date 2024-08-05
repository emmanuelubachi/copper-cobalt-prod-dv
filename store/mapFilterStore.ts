// used for map filter button search params state management
import { create } from "zustand";

// state
type MapFilterState = {
  isActiveSitesButtonVisible: boolean;
  isInactiveSitesButtonVisible: boolean;
};

// action
type MapFilterActions = {
  // active buttons
  toggleActiveSiteButton: () => void;
  showActiveSiteButton: () => void;
  closeActiveSiteButton: () => void;

  // inactive buttons
  toggleInactiveSiteButton: () => void;
  showInactiveSiteButton: () => void;
  closeInactiveSite: () => void;
};

const useMapFilterStore = create<MapFilterState & MapFilterActions>((set) => ({
  // initial state
  isActiveSitesButtonVisible: true,
  isInactiveSitesButtonVisible: false,

  // actions
  toggleActiveSiteButton: () =>
    set((state) => ({
      isActiveSitesButtonVisible: !state.isActiveSitesButtonVisible,
    })),
  showActiveSiteButton: () => set({ isActiveSitesButtonVisible: true }),
  closeActiveSiteButton: () => set({ isActiveSitesButtonVisible: false }),

  toggleInactiveSiteButton: () =>
    set((state) => ({
      isInactiveSitesButtonVisible: !state.isInactiveSitesButtonVisible,
    })),
  showInactiveSiteButton: () => set({ isInactiveSitesButtonVisible: true }),
  closeInactiveSite: () => set({ isInactiveSitesButtonVisible: false }),
}));

export default useMapFilterStore;
