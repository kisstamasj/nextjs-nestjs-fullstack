import { create } from "zustand";

interface useSidebarStore {
  status: "open" | "closed" | "mini";
  setStatus: (status: "open" | "closed" | "mini") => void;
  toggleSidebar: () => void;
}

export const useSidebar = create<useSidebarStore>((set, s) => ({
  status: "open",
  setStatus: (status) => set({ status }),
  toggleSidebar: () =>
    set(({ status }) => {
      if (status === "open") {
        if (window.innerWidth < 1023) {
          return { status: "closed" };
        }

        return { status: "mini" };
      }
      return { status: "open" };
    }),
}));
