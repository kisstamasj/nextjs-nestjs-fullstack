import React, { FC } from "react";

interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer: FC<PageHeaderContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-between items-center">{children}</div>
  );
};

export default PageHeaderContainer;
