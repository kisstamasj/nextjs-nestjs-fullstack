"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

const Logo: React.FC = () => {
  const { status, toggleSidebar } = useSidebar();

  return (
    <>
      <div
        className={cn(
          `
        flex 
        items-center          
        dark:border-slate-800 
        bg-white 
        dark:bg-slate-900 
        overflow-hidden 
        transition-all`,
          status === "open" || status === "closed"
            ? "px-5 py-5 gap-5 justify-center"
            : "px-2 py-3 justify-center"
        )}
      >
        <div
          className={`relative transition-all duration-500 ease-in-out w-[175px] h-[35px] ${
            status === "mini" ? " opacity-0 hidden" : " opacity-100"
          }`}
        >
          <Image fill src="/logo.png" alt="logo" />
        </div>
        <div
          className={`relative transition-all duration-500 ease-in-out w-10 h-[35px] ${
            status !== "mini" ? " opacity-0 hidden" : " opacity-100"
          }`}
        >
          <Image fill src="/logo-mini.png" alt="logo" />
        </div>
        <div className="block lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <XIcon className="text-slate-600" size={30} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Logo;
