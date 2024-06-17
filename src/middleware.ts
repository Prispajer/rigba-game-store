import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { handleDynamicId } from "../routes";

import {
  authRoutes,
  breakpointsRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isApiRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = handleDynamicId(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isBreakpointRoute = breakpointsRoutes.includes(req.nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl)
      );
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute && !isBreakpointRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
