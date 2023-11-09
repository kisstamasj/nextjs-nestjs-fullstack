
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface H1Props {
  children: React.ReactNode;
  className?: string;
}

const H1: FC<H1Props> = ({ children, className }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default H1;
