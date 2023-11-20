"use client"

import { useSidebar } from "@/hooks/use-sidebar";
import React, { FC } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  const sidebar = useSidebar();
  return (
    <div className="p-3 md:p-8 bg-gray-100 dark:bg-slate-950 h-full animate-fade" onClick={() => sidebar.onClose()}>
      {children}
    </div>
  );
};

export default PageContainer;
