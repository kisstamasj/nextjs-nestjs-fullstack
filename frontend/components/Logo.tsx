import { useSidebar } from "@/hooks/use-sidebar";
import Image from "next/image";
import React from "react";

interface LogoProps {
  isMobile: boolean;
}

const Logo: React.FC<LogoProps> = ({ isMobile }) => {
  const sidebar = useSidebar();
  const LogoImage =
    sidebar.isOpen || isMobile ? (
      <div className="relative w-[175px] h-[35px]">
        <Image fill src={"/logo.png"} alt="logo" />
      </div>
    ) : (
      <div className="relative w-[40px] h-[40px]">
        <Image fill src={"/logo-mini.png"} alt="logo" />
      </div>
    );
  return (
    <>
      <div className="w-full h-[60px] flex justify-center items-center border-b dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all">
        {LogoImage}
      </div>
    </>
  );
};

export default Logo;
