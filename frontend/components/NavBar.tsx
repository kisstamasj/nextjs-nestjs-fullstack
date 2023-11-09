"use client";


import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import React from "react";
import { useSidebar } from "../hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface NavBarProps {
  className?: string;
  toggleSideBar: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ className, toggleSideBar }) => {
  const sidebar = useSidebar();
  const setSidebar = () => {
    if (sidebar.isOpen) {
      return sidebar.onClose();
    }

    sidebar.onOpen();
  };
  return (
    <div
      className={cn(
        "bg-white border-b dark:border-slate-800 p-5 flex flex-row items-center h-[60px] w-full dark:bg-slate-900 dark:text-white transition-all",
        className
      )}
    >
      <div className="flex flex-row justify-between w-full">
        <div>
          {toggleSideBar && (
            <Button variant="ghost" size="icon" onClick={setSidebar}>
              <Menu className="text-gray-900 dark:text-white" size={20} />
            </Button>
          )}
        </div>
        <div className="flex flex-row justify-end">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
