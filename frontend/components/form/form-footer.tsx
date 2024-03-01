"use client";

import { RequestErrorMessage } from "@/types/errors";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { ButtonLoader } from "../loader";
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
        <Button type="button" variant={"secondary"} onClick={handleCancel}>
          <X className="h-4 w-4 mr-1" /> {cancelLabel || "Mégse"}
        </Button>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <ButtonLoader />
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
