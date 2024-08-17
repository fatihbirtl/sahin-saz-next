import { create } from "zustand"

interface useSelectedFaqProps {
  selectedItem: string
  setSelectedItem: (value: string) => void
}

export const useSelectedFaq = create<useSelectedFaqProps>((set) => ({
  selectedItem: "",
  setSelectedItem: (value) => set({ selectedItem: value }),
}))
