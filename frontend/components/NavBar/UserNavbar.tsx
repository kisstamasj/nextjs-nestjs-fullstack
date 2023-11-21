"use client";

import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import NavBar from "./NavBar";
import { Button, buttonVariants } from "../ui/button";
import NavBarContent from "./NavBarContent";
import { UserMenu } from "./UserMenu";

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
          <UserMenu />
        )}
      </NavBarContent>
    </NavBar>
  );
};

export default UserNavBar;
