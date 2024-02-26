import { create } from "zustand";

interface isFavorites {
  isFavorite: boolean;
  setIsFavorite: (isFavorite: boolean) => void;
}
const defaultValues = {
  id: "",
  title: "",
};

export const useisFavorites = create<isFavorites>((set) => ({
  isFavorite: false,
  setIsFavorite: (isFavorite) => set({ isFavorite }),
}));
