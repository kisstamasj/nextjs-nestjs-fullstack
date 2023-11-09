import React, { FC } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="p-3 md:p-8 bg-gray-100 dark:bg-slate-950 h-full animate-fade">
      {children}
    </div>
  );
};

export default PageContainer;
