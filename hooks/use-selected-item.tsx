import { create } from "zustand"

interface useSelectedItemProps {
  selectedItem: number
  setSelectedItem: (value: number) => void
}

export const useSelectedItem = create<useSelectedItemProps>((set) => ({
  selectedItem: 0,
  setSelectedItem: (value) => set({ selectedItem: value }),
}))
