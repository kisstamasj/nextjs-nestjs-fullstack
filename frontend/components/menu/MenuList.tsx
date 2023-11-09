"use client";

import { FC } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface MenuListProps {
  items: MenuItemType[];
  isMobile: boolean;
}

const MenuList: FC<MenuListProps> = ({ items, isMobile }) => {
  const sidebar = useSidebar();
  return (
    <div
      className={cn(
        "flex flex-col w-full justify-center divide-y",
        sidebar.isOpen || isMobile
          ? "dark:divide-slate-800"
          : "divide-transparent"
      )}
    >
      {items.map((item) => (
        <MenuItem key={item.id} item={item} isMobile={isMobile} />
      ))}
    </div>
  );
};

export default MenuList;
