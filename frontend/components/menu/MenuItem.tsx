"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import Icon from "../ui/Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface MenuItemType {
  id: string;
  label: string;
  icon: keyof typeof dynamicIconImports;
  href: string;
}

interface MenuItemProps {
  item: MenuItemType;
  isMobile: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ item, isMobile }) => {
  const sidebar = useSidebar();

  let linkClass: string;
  let linkClassShared =
    "flex flex-row items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition font-light";
  if (sidebar.isOpen || isMobile) {
    linkClass = `${linkClassShared} md:justify-normal gap-x-3 px-4 py-4`;
  } else {
    linkClass = `${linkClassShared} px-3 py-4`;
  }

  return (
    <>
      <div className="w-full">
        <Link href={item.href} className={linkClass}>
          <div>
            <Icon name={item.icon} className="text-gray-500 dark:text-white" size={20} />
          </div>
          {(sidebar.isOpen || isMobile) && <div>{item.label}</div>}
        </Link>
      </div>
    </>
  );
};

export default MenuItem;
