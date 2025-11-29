import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies(); // ✅ ต้อง await
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(req.url);
  const memoryId = searchParams.get("memoryId"); // ✅ ใช้ชื่อใหม่ memoryId

  let query = supabase.from("milestones").select("*").order("year", { ascending: true });
  if (memoryId) query = query.eq("memoryId", memoryId); // ✅ ชื่อ column ในตาราง

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function POST(req) {
  const cookieStore = await cookies(); // ✅ ต้อง await
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const body = await req.json();
  // body = { year, text, emoji, image_url, detail, memoryId }
  const { data, error } = await supabase.from("milestones").insert([body]).select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function DELETE(req) {
  const cookieStore = await cookies(); // ✅ ต้อง await
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { error } = await supabase.from("milestones").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
