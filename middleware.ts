"use server";
import { NextRequest, NextResponse } from "next/server";
import { isUrlMatching } from "./lib/utils";
import {
  authRoutes,
  publicRoutes,
  routesRedirects,
} from "./constants/auth-routes";
import { getServerSession } from "./lib/auth/server-session";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    return null;
  }
  const user = await getServerSession().catch((e) => null);
  const isLoggedIn = user != null;
  const route = request.nextUrl;

  const isPublicRoute = isUrlMatching(route.pathname, publicRoutes);
  const isAuthRoute = isUrlMatching(route.pathname, authRoutes);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(routesRedirects.loggedin_auth_route, route),
      );
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(
      new URL(routesRedirects.not_authorized, route),
    );
  }

  return null;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
