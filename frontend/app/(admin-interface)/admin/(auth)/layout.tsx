"use client"


import NavBar from "@/components/NavBar";
import React from "react";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <NavBar toggleSideBar={false} className="fixed top-0" />
      <div className="flex h-full items-center justify-center">{children}</div>
    </>
  );
}

export default AuthLayout;