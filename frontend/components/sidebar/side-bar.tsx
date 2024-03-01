"use client";

import Logo from "@/components/Logo";
import MenuList from "./menu-list";
import { MenuItemType } from "./menu-item";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

interface SideBarDesktopProps {
  menuItems: MenuItemType[];
}

const SideBar: React.FC<SideBarDesktopProps> = ({ menuItems }) => {
  const sidebar = useSidebar();

  return (
    <>
      <aside
        className={cn(
          `
      absolute 
      left-0 
      top-0 
      z-50
      flex 
      w-72 
      flex-col 
      overflow-y-hidden  
      border-r 
      transition-all 
      duration-500 
      overflow-hidden 
      ease-in-out
      h-full
      lg:static
      lg:translate-x-0
      bg-background`,
          sidebar.status === "open"
            ? "translate-x-0"
            : "-translate-x-full lg:w-16"
        )}
      >
        <div className="bg-secondary/30 text-foreground w-full h-full">
          <Logo />
          <MenuList items={menuItems} />
        </div>
      </aside>
    </>
  );
};

export default SideBar;
