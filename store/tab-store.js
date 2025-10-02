import { create } from "zustand";

export const useTabStore = create((set) => ({
  activeTab: "info",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
