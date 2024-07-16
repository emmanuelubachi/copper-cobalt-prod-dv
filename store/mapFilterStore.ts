import { create } from "zustand";

type MapFilterState = {
  isActiveSitesButtonVisible: boolean;
  isInactiveSitesButtonVisible: boolean;
};

type MapFilterActions = {
  toggleActiveSiteButton: () => void;
  showActiveSiteButton: () => void;
  closeActiveSiteButton: () => void;

  toggleInactiveSiteButton: () => void;
  showInactiveSiteButton: () => void;
  closeInactiveSite: () => void;
};

const useMapFilterStore = create<MapFilterState & MapFilterActions>((set) => ({
  // initial state
  isActiveSitesButtonVisible: false,
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
