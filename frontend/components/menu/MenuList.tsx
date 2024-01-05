"use client";

import { FC } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: FC<MenuListProps> = ({ items }) => {
  const sidebar = useSidebar();
  return (
    <div className="flex flex-col justify-center divide-y pt-6 dark:divide-slate-800">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
