import { cn } from "@/lib/utils";
import React from "react";

interface NavBarProps {
  className?: string;
  children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "border-b p-5 flex flex-row items-center h-[60px] bg-secondary/30 text-foreground transition-all w-full",
        className
      )}
    >
      <div className="flex flex-row justify-between w-full">{children}</div>
    </div>
  );
};

export default NavBar;
