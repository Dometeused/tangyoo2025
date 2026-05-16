// 📄 src/app/api/events/route.js
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ===================
// ✅ GET: ดึง event ของ user (ไม่แปลง url ซ้ำ)
export async function GET(req) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, error: "unauthenticated" }, { status: 401 });
  }

  // Query event เฉพาะ email นี้
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("email", user.email);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // ❌ ไม่ต้อง map อะไรทั้งสิ้น
  return NextResponse.json({ success: true, data });
}

// ===================
// ✅ POST: เพิ่ม event ใหม่
export async function POST(req) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, error: "unauthenticated" }, { status: 401 });
  }

  const { name, date, place, theme, bio, story, timeline_events, coverImage, youtube_link, impressions, theme_song } = await req.json();
  if (!name || !date || !place || !theme) {
    return NextResponse.json({ success: false, error: "missing fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        name,
        date,
        place,
        theme,
        bio: bio || "",
        bio2: story || "", // Map story to bio2
        timeline_events: timeline_events || [],
        cover_url: coverImage || "",
        youtube_link: youtube_link || "",
        impressions: impressions || [],
        theme_song: theme_song || "",
        phase: "invitation",
        email: user.email,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // ส่ง data ตรง ๆ
  return NextResponse.json({ success: true, data });
}

// ===================
// ✅ DELETE: ลบ event ของตัวเอง
export async function DELETE(req) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, error: "unauthenticated" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ success: false, error: "missing id" }, { status: 400 });
  }

  // เช็คว่าเป็นของ user นี้
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("email", user.email);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
