"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Alert variant="destructive" className="w-[500px]">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
        </AlertDescription>
      </Alert>
    </div>
  );
}
