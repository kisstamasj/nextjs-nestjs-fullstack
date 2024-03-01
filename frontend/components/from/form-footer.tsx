"use client";

import { RequestErrorMessage } from "@/types/errors";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { FormError } from "./form-error";

interface FormFooterProps {
  error?: RequestErrorMessage;
  isPending?: boolean;
  cancel?: MouseEventHandler<HTMLButtonElement>;
  cancelUrl?: string;
  cancelLabel?: string;
  submitLabel?: string;
}

export const FormFooter = ({
  cancel: cancelCallback,
  cancelLabel,
  error,
  isPending,
  submitLabel,
  cancelUrl,
}: FormFooterProps) => {
  const router = useRouter();
  const handleCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (cancelCallback) {
      cancelCallback(event);
    } else if (cancelUrl) {
      router.push(cancelUrl);
    }
  };
  return (
    <>
      <div className="flex w-full justify-center gap-5 items-center">
        <Button variant={"secondary"} onClick={handleCancel}>
          <X className="h-4 w-4 mr-1" /> {cancelLabel || "Mégse"}
        </Button>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {submitLabel || "Mentés"}
        </Button>
      </div>
      <FormError message={error} />
    </>
  );
};
