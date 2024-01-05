"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";

const Logo: React.FC = () => {
  const { isOpen, onClose, onOpen } = useSidebar();
  const setSidebar = () => {
    if (isOpen) {
      return onClose();
    }
    onOpen();
  };
  return (
    <>
      <div className="flex items-center justify-between gap-2 px-5 py-3 border-b dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all">
        <div className="relative w-[175px] h-[35px]">
          <Image fill src={"/logo.png"} alt="logo" />
        </div>
        <div className="block lg:hidden">
          <Button variant="ghost" size="icon" onClick={setSidebar}>
            <XIcon className="text-slate-600" size={30} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Logo;
