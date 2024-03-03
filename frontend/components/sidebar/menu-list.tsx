"use client";

import { FC } from "react";
import MenuItem, { MenuItemType } from "./menu-item";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: FC<MenuListProps> = ({ items }) => {
  const sidebar = useSidebar();
  return (
    <div
      className={cn(
        `flex flex-col justify-center divide-y divide-primary-foreground pt-6`,
        sidebar.status === "mini" ? "divide-y-0" : ""
      )}
    >
      {items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
