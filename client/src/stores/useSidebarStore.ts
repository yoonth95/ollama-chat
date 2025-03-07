import { create } from "zustand";
import Cookies from "js-cookie";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: Cookies.get("sidebar") !== "closed",
  toggleSidebar: () =>
    set((state) => {
      const newState = !state.isOpen;
      Cookies.set("sidebar", newState ? "open" : "closed", { expires: 7 });
      return { isOpen: newState };
    }),
}));
