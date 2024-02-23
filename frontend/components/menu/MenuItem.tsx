"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import Link from "next/link";
import React, { FC } from "react";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn, isMobileScreen } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { icons } from "lucide-react";

export interface MenuItemType {
  id: string;
  label: string;
  icon: keyof typeof icons;
  href: string;
}

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const sidebar = useSidebar();
  const pathName = usePathname();
  const isActive = pathName === item.href;
  let linkClass =
    "flex flex-row items-center  hover:bg-gray-100 dark:hover:bg-slate-800 transition font-light justify-normal gap-x-3 px-5 py-4";

  const menuItemClick = () => {
    if (isMobileScreen()) {
      sidebar.toggleSidebar();
    }
  }

  return (
    <>
      <div className={cn("w-full", isActive ? "bg-gray-200 dark:bg-slate-800" : "")}>
        <Link href={item.href} className={linkClass} onClick={menuItemClick}>
          <div className="">
            <Icon name={item.icon} className={cn("text-gray-500 dark:text-white")} size={20} />
          </div>
          <div className={cn(`transition-all duration-500 ease-linear`, sidebar.status === "mini" ? "hidden" : "block")}>{item.label}</div>
        </Link>
      </div>
    </>
  );
};

export default MenuItem;
