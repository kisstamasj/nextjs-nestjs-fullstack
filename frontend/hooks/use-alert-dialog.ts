import { create } from "zustand";

interface useAlertDialogStore {
  isOpen: boolean;
  title: string;
  description: string;
  okButtonText: string;
  showAlertDialog: () => void;
  closeAlertDialog: () => void;
  onClose: () => void;
}

export const useAlertDialog = create<useAlertDialogStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  okButtonText: "Ok",
  showAlertDialog: () => set({ isOpen: true }),
  closeAlertDialog: () => set({ isOpen: false }),
  onClose: () => {},
}));
