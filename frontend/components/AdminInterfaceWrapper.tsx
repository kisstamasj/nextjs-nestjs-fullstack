"use client";

import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";

interface AdminInterfaceWrapperProps {
  children: React.ReactNode | null;
}

const AdminInterfaceWrapper: FC<AdminInterfaceWrapperProps> = ({
  children,
}) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const currentTheme = localStorage.getItem("admin-theme");
    setTheme(currentTheme || "system");
    if (!currentTheme) {
      localStorage.setItem("admin-theme", theme || "default");
    }
    setMounted(true);
  }, [setMounted, setTheme, theme]);

  if (!mounted) return null;
  return <>{children}</>;
};

export default AdminInterfaceWrapper;
