"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { FC } from "react";

interface NavBarContentProps {
  children: React.ReactNode;
}

const NavBarContent: FC<NavBarContentProps> = ({ children }) => {
  const { status } = useSession();
  return (
    <div className="flex flex-row items-center justify-end w-full gap-3">
      {status === "loading" ? <Loader2 className="animate-spin"/> : children}
    </div>
  );
};

export default NavBarContent;
