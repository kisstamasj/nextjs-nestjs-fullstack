"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Alert variant="destructive" className="w-[500px] bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>A keresett oldal nem található!</AlertTitle>
        <AlertDescription>
          <Button
            onClick={
              () => router.back()
            }
          >
            Vissza
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
