import { type ClassValue, clsx } from "clsx";
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
