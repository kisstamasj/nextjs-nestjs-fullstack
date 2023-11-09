"use client";

import Logo from "./Logo";
import { MenuItemType } from "./menu/MenuItem";
import React from "react";
import MenuList from "./menu/MenuList";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface SideBarMobileProps {
  menuItems: MenuItemType[];
}

const SideBarMobile: React.FC<SideBarMobileProps> = ({ menuItems }) => {
  const sidebar = useSidebar();

  return (
    <div
      className={cn(
        "fixed top-[60px] md:hidden w-[270px] text-black h-full bg-white border-r dark:border-slate-800 transition-all duration-500 ease-in-out dark:bg-slate-900 dark:text-white",
        sidebar.isOpen ? "left-0" : "left-[-270px]"
      )}
    >
      <div className="relative w-full h-full">
        <Logo isMobile={true} />
        <MenuList items={menuItems} isMobile={true} />
      </div>
    </div>
  );
};

export default SideBarMobile;
