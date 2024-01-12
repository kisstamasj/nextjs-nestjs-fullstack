/**
 * An array of routes that are publicly accessible
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/error",
];

/**
 * The prefix for the API auth routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
