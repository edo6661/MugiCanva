import { create } from "zustand";

interface RenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}
const defaultValues = {
  id: "",
  title: "",
};

export const useRenameModal = create<RenameModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (id: string, title: string) =>
    set({ isOpen: true, initialValues: { id, title } }),
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
}));
