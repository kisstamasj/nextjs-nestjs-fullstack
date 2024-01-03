"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import React, { FC } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div className={`p-3 bg-gray-100 dark:bg-slate-950 h-full animate-fade`}>
      <div className="bg-white p-8 dark:bg-slate-900">{children}</div>
    </div>
  );
};

export default PageContainer;
