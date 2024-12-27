import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { handleDynamicId } from "../routes";

import {
  authRoutes,
  endpointsRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth || !!req.cookies.get("authjs.session-token");

  const isApiRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = handleDynamicId(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isEndpointRoute = endpointsRoutes.includes(req.nextUrl.pathname);

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

  if (!isLoggedIn && !isPublicRoute && !isEndpointRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account", "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
