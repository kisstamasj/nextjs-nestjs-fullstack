"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { DarkModeToggle } from "../DarkModeToggle";
import { Button } from "../ui/button";
import NavBar from "./NavBar";
import NavBarContent from "./NavBarContent";
import { UserMenu } from "./UserMenu";

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
      <div className="block lg:hidden">
        <Button variant="ghost" size="icon" onClick={setSidebar}>
          <Menu className="text-gray-900 dark:text-white" size={20} />
        </Button>
      </div>
      <NavBarContent>
        {data && <UserMenu />}
        <div className="flex flex-row justify-end">
          <DarkModeToggle />
        </div>
      </NavBarContent>
    </NavBar>
  );
};

export default AdminNavBar;
