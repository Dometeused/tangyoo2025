// 📁 src/app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // รองรับ ?next= เพื่อให้ creation flow resume ได้หลัง OAuth
  const next = requestUrl.searchParams.get("next");
  const redirectTo = next
    ? `${requestUrl.origin}${decodeURIComponent(next)}`
    : `${requestUrl.origin}/dashboard`;

  return NextResponse.redirect(redirectTo);
}
