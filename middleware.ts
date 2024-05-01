import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import authConfig from "@/auth.config";
import {
  AFTER_LOGIN_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.auth?.user.role !== "ADMIN"
  ) {
    return NextResponse.rewrite(new URL("/_error", req.url));
  }
  if (
    req.nextUrl.pathname.startsWith("/teacher") &&
    req.auth?.user.role !== "TEACHER"
  ) {
    return NextResponse.rewrite(new URL("/_error", req.url));
  }
  if (
    req.nextUrl.pathname.startsWith("/student") &&
    req.auth?.user.status !== "ACTIVE"
  ) {
    return NextResponse.rewrite(new URL("/_error", req.url));
  }
  if (
    req.nextUrl.pathname.startsWith("/home") &&
    req.auth?.user.status !== "ACTIVE"
  ) {
    return NextResponse.redirect(new URL("/inActive", req.url));
  }

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(AFTER_LOGIN_URL, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(`/auth/login`, nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/admin",
    "/teacher",
  ],
};
