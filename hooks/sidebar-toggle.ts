import { create } from "zustand"

interface SidebarToggle {
    toggleCollapse: boolean,
    invokeToggleCollapse: () => void
}

export const useSideBarToggle = create<SidebarToggle>((set, get) => ({
    toggleCollapse: false,
    invokeToggleCollapse: () => set({ toggleCollapse: !get().toggleCollapse })
}))