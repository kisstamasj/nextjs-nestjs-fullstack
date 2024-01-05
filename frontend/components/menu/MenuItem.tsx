"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import Link from "next/link";
import React, { FC } from "react";
import Icon from "../ui/Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";

export interface MenuItemType {
  id: string;
  label: string;
  icon: keyof typeof dynamicIconImports;
  href: string;
}

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const sidebar = useSidebar();

  let linkClass =
    "flex flex-row items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition font-light md:justify-normal gap-x-3 px-5 py-4";

  return (
    <>
      <div className="w-full">
        <Link href={item.href} className={linkClass}>
          <div>
            <Icon name={item.icon} className="text-gray-500 dark:text-white" size={20} />
          </div>
          <div className={cn(`transition-all duration-500 ease-linear`, sidebar.status === "mini" ? "hidden" : "block")}>{item.label}</div>
        </Link>
      </div>
    </>
  );
};

export default MenuItem;
