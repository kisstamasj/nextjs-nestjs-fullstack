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
  let response = NextResponse.next();
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes("next-auth")) response.cookies.delete(cookie.name);
  });

  return response;
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
    try {
      const newTokens = await refreshToken(session);
      const newSessionToken = await encode({
        secret: process.env.NEXTAUTH_SECRET!,
        token: {
          ...session,
          backendTokens: newTokens,
        },
        maxAge: 604800 /* TODO: 7 days -> get from the env */,
      });
      response = updateCookie(newSessionToken, request, response)
    } catch (error) {
        response = updateCookie(null, request, response)
    }
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

  if (response.statusCode == 403) {
    throw new Error("RefreshTokenError");
  }

  console.log("refreshed", response);

  return response;
}

function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse
) {
  if (sessionToken) {
    // set request cookies for the incoming getServerSession to read new session
    request.cookies.set(sessionCookie, sessionToken);

    // updated request cookies can only be passed to server if its passdown here after setting its updates
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // set response cookies to send back to browser
    response.cookies.set(sessionCookie, sessionToken, {
      httpOnly: true,
      maxAge: 604800 /* TODO: 7 days -> get from the env */,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  } else {
    request.cookies.delete(sessionCookie);
    response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
    response.cookies.delete(sessionCookie)
  }

  return response;
}
