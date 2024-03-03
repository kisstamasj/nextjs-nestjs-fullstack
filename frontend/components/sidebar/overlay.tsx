"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { FC } from "react";

const Overlay: FC = ({}) => {
  const sidebar = useSidebar();
  return (
    <>
      {sidebar.status === "open" && (
        <div
          className={cn(
            "fixed left-0 top-0 z-40 h-full w-full bg-black/80 lg:hidden backdrop-blur-sm animate-fade"
          )}
        />
      )}
    </>
  );
};

export default Overlay;
