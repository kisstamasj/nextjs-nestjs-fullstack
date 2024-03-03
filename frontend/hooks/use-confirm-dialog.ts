import { create } from "zustand";

interface useConfirmDialogStore {
  isOpen: boolean;
  title: string;
  cancelButtonText: string;
  okButtonText: string;
  description: string;
  isConfirmed: boolean;
  onConfirm: () => void;
  showConfirmDialog: () => void;
  closeConfirmDialog: () => void;
  setConfirmed: (confirmed: boolean) => void;
}

export const useConfirmDialog = create<useConfirmDialogStore>((set) => ({
  isOpen: false,
  title: "",
  cancelButtonText: "Cancel",
  okButtonText: "Ok",
  description: "",
  isConfirmed: false,
  onConfirm: () => {},
  showConfirmDialog: () => set({ isOpen: true }),
  closeConfirmDialog: () => set({ isOpen: false }),
  setConfirmed: (confirmed) => set({ isConfirmed: confirmed }),
}));
