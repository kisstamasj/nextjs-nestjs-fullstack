"use client";

import React, { FC } from "react";
import NavBar from "./NavBar";
import { buttonVariants } from "../ui/button";
import NavBarContent from "./NavBarContent";
import { UserMenu } from "./UserMenu";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

interface UserNavBarPros {
    className?: string;
}

const UserNavBar: FC<UserNavBarPros> = ({className}) => {
  const currentUser = useCurrentUser();
  return (
    <NavBar className={className}>
      <NavBarContent>
        <Link className={buttonVariants({variant: "link"})} href="/">Home</Link>
        {!currentUser && <>
        <Link className={buttonVariants({variant: "link"})} href="/auth/sign-in">Sign In</Link>
        <Link className={buttonVariants({variant: "link"})} href="/auth/sign-up">Sign Up</Link>
        </>}
        {currentUser && (
          <UserMenu />
        )}
      </NavBarContent>
    </NavBar>
  );
};

export default UserNavBar;
