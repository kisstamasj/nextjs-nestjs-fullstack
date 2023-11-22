"use client";

import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";

interface UserInterfaceWrapperProps {
  children: React.ReactNode | null;
}

const UserInterfaceWrapper: FC<UserInterfaceWrapperProps> = ({ children }) => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTheme("light");
    setMounted(true);
  }, [setMounted, setTheme]);

  if (!mounted) return null;
  return <>{children}</>;
};

export default UserInterfaceWrapper;
