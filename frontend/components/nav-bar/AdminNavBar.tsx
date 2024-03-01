"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { Menu } from "lucide-react";
import { FC } from "react";
import { DarkModeToggle } from "../DarkModeToggle";
import { Button } from "../ui/button";
import NavBar from "./NavBar";
import NavBarContent from "./NavBarContent";
import { UserMenu } from "./UserMenu";
import { useCurrentUser } from "@/hooks/use-current-user";

const AdminNavBar: FC = () => {
  const currentUser = useCurrentUser()
  const { toggleSidebar } = useSidebar();
  
  return (
    <NavBar>
      <div className="">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="text-foreground" size={20} />
        </Button>
      </div>
      <NavBarContent>
        {currentUser && <UserMenu />}
        <div className="flex flex-row justify-end">
          <DarkModeToggle />
        </div>
      </NavBarContent>
    </NavBar>
  );
};

export default AdminNavBar;
