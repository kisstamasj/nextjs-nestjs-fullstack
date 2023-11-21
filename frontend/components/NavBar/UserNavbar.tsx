"use client";

import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import NavBar from "./NavBar";
import { Button, buttonVariants } from "../ui/button";
import NavBarContent from "./NavBarContent";

interface UserNavBarPros {
    className?: string;
}

const UserNavBar: FC<UserNavBarPros> = ({className}) => {
  const { data:session } = useSession();
  return (
    <NavBar className={className}>
      <NavBarContent>
        {!session && <>
        <Link className={buttonVariants({variant: "link"})} href="/sign-in">Sign In</Link>
        <Link className={buttonVariants({variant: "link"})} href="/sign-up">Sign Up</Link>
        </>}
        {session && (
          <div>
            <Button variant="link" onClick={() => signOut({ redirect: true })}>
              Kijelentkezés <LogOutIcon size={20} className="ml-3" />
            </Button>
          </div>
        )}
      </NavBarContent>
    </NavBar>
  );
};

export default UserNavBar;
