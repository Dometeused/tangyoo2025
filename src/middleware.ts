// src/middleware.ts
// Refreshes the Supabase session cookie on every request (keeps the user logged in)
// and protects dashboard/admin routes from unauthenticated access.

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // This line is CRITICAL — it reads + refreshes the session cookie,
  // so the token never expires silently mid-session.
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // ── Protect /dashboard/** ─────────────────────────────────────
  if (pathname.startsWith("/dashboard") && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // ── Protect /admin/** (except /admin/login) ───────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    // Optionally check is_admin here too (belt-and-suspenders),
    // but the heavy check is done in the page itself.
  }

  // Return the response WITH the refreshed Set-Cookie header
  return res;
}

export const config = {
  matcher: [
    // Run on dashboard, admin, and event pages
    // Skip static files, images, favicons, and Next internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
