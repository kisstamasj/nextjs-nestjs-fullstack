import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { JWT, encode, getToken } from "next-auth/jwt";
import { BACKEND_URL } from "./lib/constants";

interface BackendTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const config = {
  matcher: "/:path*",
};

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

function signOut(request: NextRequest) {
//   const response = NextResponse.redirect(
//     new URL("/api/auth/signin", request.url)
//   );

//   request.cookies.getAll().forEach((cookie) => {
//     if (cookie.name.includes("next-auth")) response.cookies.delete(cookie.name);
//   });

//   return response;
}

function shouldUpdateToken(tokens: BackendTokens) {
  if (new Date().getTime() < tokens.expiresIn) {
    return false;
  }

  return true;
}

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const session = await getToken({ req: request });

  if (!session) return signOut(request);

  let response = NextResponse.next();

  if (shouldUpdateToken(session.backendTokens)) {
    // Here yoy retrieve the new access token from your custom backend
    const newTokens = await refreshToken(session);

    const newSessionToken = await encode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: {
        ...session,
        backendTokens: newTokens,
      },
      maxAge: 604800 /* TODO: 7 days -> get from the env */
    });

    request.cookies.set(sessionCookie, newSessionToken);

    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Update session token with new access token
    response.cookies.set(sessionCookie, newSessionToken);
  }

  return response;
};

async function refreshToken(token: JWT): Promise<BackendTokens> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  console.log("refreshed", response);

  return response;
}
