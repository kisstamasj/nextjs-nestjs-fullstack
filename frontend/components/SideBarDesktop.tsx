"use client";

import Logo from "./Logo";
import MenuList from "./menu/MenuList";
import { MenuItemType } from "./menu/MenuItem";
import React from "react";
import { cn } from "../lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

interface SideBarDesktopProps {
  menuItems: MenuItemType[];
}

const SideBarDesktop: React.FC<SideBarDesktopProps> = ({ menuItems }) => {
  const sidebar = useSidebar();

  return (
    <div
      className={cn(
        "hidden md:block text-black bg-white border-r dark:border-slate-800 relative transition-all duration-500 overflow-hidden ease-in-out dark:bg-slate-900 dark:text-white",
        sidebar.isOpen ? "w-[400px]" : "w-[60px]"
      )}
    >
      <Logo isMobile={false} />
      <MenuList items={menuItems} isMobile={false} />
    </div>
  );
};

export default SideBarDesktop;
