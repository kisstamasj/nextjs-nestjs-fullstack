"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
      </ThemeProvider>
    </>
  );
};

export default ClientProviders;
