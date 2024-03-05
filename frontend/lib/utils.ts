import { RequestErrorMessage } from "@/types/errors";
import { type ClassValue, clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isServer() {
  return typeof window === "undefined";
}

export function getBackendUrl() {
  return isServer()
    ? process.env.NEXT_INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
}

export const isMobileScreen = () => {
  return window.matchMedia("(max-width: 1024px)").matches;
};

export const handleFormError = (
  error: RequestErrorMessage,
  form: UseFormReturn<any, any, any>,
  setFormError: (error: RequestErrorMessage) => void
) => {
  if(!error) return;
  if (Array.isArray(error)) {
    error.forEach((m) => {
      // @ts-ignore
      form.setError(m.property, {
        message: m.message,
      });
    });
  } else {
    setFormError(error);
  }
};
