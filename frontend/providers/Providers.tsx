"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
