// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Runs on every request that matches the config.matcher
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware triggered for path:", pathname);
  // We only guard /dashboard and its subpaths
  if (pathname.startsWith("/dash")) {
    const token = req.cookies.get("access_token")?.value;
    // If no auth_token cookie -> redirect to /login
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      // Optional: remember where they wanted to go
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Otherwise, allow request
  return NextResponse.next();
}

// Limit middleware to dashboard routes only
export const config = {
  matcher: ["/dash/:path*"],
};
