import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(req.url);
  // Accept any alias — DB column is memory_id
  const eventId = searchParams.get("event_id") || searchParams.get("memoryId") || searchParams.get("memory_id");

  let query = supabase.from("milestones").select("*").order("year", { ascending: true });
  if (eventId) query = query.eq("memory_id", eventId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const body = await req.json();

  // Normalize all possible field names → memory_id
  const eventId = body.event_id || body.memoryId || body.memory_id;
  const { event_id: _a, memoryId: _b, memory_id: _c, ...rest } = body;

  const { data, error } = await supabase
    .from("milestones")
    .insert([{ ...rest, memory_id: eventId }])
    .select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function DELETE(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { error } = await supabase.from("milestones").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
