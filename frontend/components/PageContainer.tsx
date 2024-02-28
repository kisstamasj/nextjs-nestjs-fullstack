import React, { FC } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div
      className={`md:p-3 p-1 bg-slate-100 dark:bg-slate-950 h-full animate-fade z-10`}
    >
      <div className="bg-white md:p-8 p-4 border border-slate-200 dark:border-none dark:bg-slate-900 rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
