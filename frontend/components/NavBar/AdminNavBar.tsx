"use client";

import React, { FC } from "react";
import NavBar from "./NavBar";
import { Button } from "../ui/button";
import { LogOutIcon, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useSidebar } from "@/hooks/use-sidebar";
import { DarkModeToggle } from "../DarkModeToggle";
import NavBarContent from "./NavBarContent";

const AdminNavBar: FC = () => {
  const { data } = useSession();
  const { isOpen, onClose, onOpen } = useSidebar();
  const setSidebar = () => {
    if (isOpen) {
      return onClose();
    }
    onOpen();
  };
  return (
    <NavBar>
      <div>
        <Button variant="ghost" size="icon" onClick={setSidebar}>
          <Menu className="text-gray-900 dark:text-white" size={20} />
        </Button>
      </div>
      <NavBarContent>
        {data && (
          <div>
            <Button variant="link" onClick={() => signOut({ redirect: true })}>
              Kijelentkezés <LogOutIcon size={20} className="ml-3" />
            </Button>
          </div>
        )}
        <div className="flex flex-row justify-end">
          <DarkModeToggle />
        </div>
        </NavBarContent>
    </NavBar>
  );
};

export default AdminNavBar;
