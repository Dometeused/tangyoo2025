import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, error: "unauthenticated" }, { status: 401 });
  }

  const { id, theme } = await req.json();

  if (!id || !theme) {
    return NextResponse.json({ success: false, error: "missing id or theme" }, { status: 400 });
  }

  const { error } = await supabase
    .from("events")
    .update({ theme })
    .eq("id", id)
    .eq("email", user.email); // ยืนยันว่าเจ้าของอัปเดตของตัวเองเท่านั้น

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
