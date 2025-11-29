// ✅ /middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession(); // ✅ จำเป็นสำหรับโหลด session ฝั่ง server

  return res;
}

// ✅ แก้ matcher ให้ครอบคลุมหน้าอื่นด้วย เช่น /event และ /api
export const config = {
  matcher: [
    "/dashboard/:path*",   // เดิม
    "/event/:path*",       // ✅ เพิ่มเพื่อให้ MemoryPage/InvitationPage ใช้ session ได้
    "/api/:path*",         // ✅ ถ้ามี API ที่ต้อง auth ตรวจ user
    "/auth/callback", // ✅ ต้องเพิ่มตรงนี้ด้วย
  ],
};
