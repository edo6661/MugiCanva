import { create } from "zustand";

interface AddBoard {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: () => void;
  onClose: () => void;
}
const defaultValues = {
  title: "",
  imageUrl: "",
};

export const useAddBoard = create<AddBoard>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
}));
