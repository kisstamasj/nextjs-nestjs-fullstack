import React, { FC } from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div
      className={`md:p-3 p-1 bg-background h-full animate-fade z-10`}
    >
      <div className="md:p-8 p-4 border bg-secondary/30 rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
