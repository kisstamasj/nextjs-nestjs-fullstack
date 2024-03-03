"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { FC } from "react";
import { AlertDialog, AlertDialogOverlay } from "../ui/alert-dialog";

const Overlay: FC = ({}) => {
  const sidebar = useSidebar();
  return (
    <>
      <AlertDialog open={sidebar.status === "open"}>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};

export default Overlay;
