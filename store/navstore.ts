// this store is not in use
import { create } from "zustand";

type NavState = {
  isNavOpen: boolean;
  toggleNav: () => void;
  openNav: () => void;
  closeNav: () => void;
};

const useNavStore = create<NavState>((set) => ({
  // initial state
  isNavOpen: false,

  // actions
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
}));

export default useNavStore;
