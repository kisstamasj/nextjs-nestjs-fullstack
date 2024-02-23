"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FC, Fragment, useEffect, useState } from "react";

interface LoaderProps {
  className?: string;
  showAfterMs?: number;
}

export const Loader: FC<LoaderProps> = ({ className, showAfterMs = 500 }) => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setShowLoader(true);
    }, showAfterMs);

    return () => clearTimeout(timeOut);
  }, [showAfterMs]);

  return (
    <Fragment>
      {showLoader && (
        <span className="animate-fade">
          <Loader2 className={cn("w-20 h-20 animate-spin", className)} />
        </span>
      )}
    </Fragment>
  );
};
