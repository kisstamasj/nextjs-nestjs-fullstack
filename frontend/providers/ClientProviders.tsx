"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
};

export default ClientProviders;
