"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
