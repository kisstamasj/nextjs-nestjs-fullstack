export const IS_SERVER = typeof window === "undefined";

export const BACKEND_URL = IS_SERVER
? process.env.NEXT_INTERNAL_API_URL
: process.env.NEXT_PUBLIC_API_URL;