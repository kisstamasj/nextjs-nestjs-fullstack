"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export function ConfirmDialogProvider() {
  const {
    isOpen,
    title,
    description,
    okButtonText,
    cancelButtonText,
    setConfirmed,
    closeConfirmDialog,
    onConfirm,
  } = useConfirmDialog();
  const handleOkClick = async () => {
    setConfirmed(true);
    closeConfirmDialog();
    onConfirm();
  };
  const handleCancelClick = () => {
    setConfirmed(false);
    closeConfirmDialog();
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleOkClick}>
            {okButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
