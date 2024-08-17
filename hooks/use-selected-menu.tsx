import { create } from "zustand"

interface useSelectedMenuProps {
  selectedItem: string
  setSelectedItem: (value: string) => void
}

export const useSelectedMenu = create<useSelectedMenuProps>((set) => ({
  selectedItem: "",
  setSelectedItem: (value) => set({ selectedItem: value }),
}))
