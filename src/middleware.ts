// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Routes that should be accessible without being logged in
const PUBLIC_PATHS = [
  "/login", // login page
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => {
    return pathname === path || pathname.startsWith(path + "/");
  });
}

// Name of the cookie where you store your session / auth token
// Make sure this matches what your backend sets
const SESSION_COOKIE_NAME = "access_token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internal and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const session = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isLoggedIn = !!session;
  const publicRoute = isPublicPath(pathname);

  // 1) If NOT logged in and trying to access a protected route → go to /login
  if (!isLoggedIn && !publicRoute) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname); // so you can redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // 2) If logged in and trying to access /login → redirect to dashboard (or home)
  if (isLoggedIn && pathname === "/login") {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/"; // change if your main page is different
    return NextResponse.redirect(dashboardUrl);
  }

  // Otherwise, continue
  return NextResponse.next();
}

// This tells Next.js which paths the middleware should run on
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
