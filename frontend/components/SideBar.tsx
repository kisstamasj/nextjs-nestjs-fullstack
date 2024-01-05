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

const SideBar: React.FC<SideBarDesktopProps> = ({ menuItems }) => {
  const sidebar = useSidebar();

  return (
    <aside
      className={cn(`
      absolute 
      left-0 
      top-0 
      z-50
      flex 
      w-72 
      flex-col 
      overflow-y-hidden  
      text-black 
      bg-white 
      border-r 
      dark:border-slate-800 
      transition-all 
      duration-500 
      overflow-hidden 
      ease-linear
      h-full
      lg:static
      lg:translate-x-0
      dark:bg-slate-900 
      dark:text-white`, sidebar.status === "open" ? "translate-x-0" : "-translate-x-full lg:w-16")}
    >
      <Logo />
      <MenuList items={menuItems} />
    </aside>
  );
};

export default SideBar;
