import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(req.url);

  // Support both param names for backward compat
  const eventId = searchParams.get("event_id") || searchParams.get("memoryId");

  let query = supabase.from("milestones").select("*").order("year", { ascending: true });

  if (eventId) {
    // Try event_id column first (snake_case), fallback to memoryId (legacy)
    const { data: byEventId, error: e1 } = await query.eq("event_id", eventId);
    if (!e1) return NextResponse.json({ data: byEventId ?? [] });

    // fallback: memoryId column
    const { data: byMemoryId, error: e2 } = await supabase
      .from("milestones").select("*").order("year", { ascending: true })
      .eq("memoryId", eventId);
    if (!e2) return NextResponse.json({ data: byMemoryId ?? [] });

    return NextResponse.json({ data: [] });
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const body = await req.json();

  // Normalize: accept both event_id and memoryId, store as event_id
  const eventId = body.event_id || body.memoryId;
  const { event_id: _a, memoryId: _b, ...rest } = body;

  const { data, error } = await supabase
    .from("milestones")
    .insert([{ ...rest, event_id: eventId }])
    .select("*");

  if (error) {
    // Fallback: try with memoryId column if event_id column doesn't exist
    const { data: data2, error: error2 } = await supabase
      .from("milestones")
      .insert([{ ...rest, memoryId: eventId }])
      .select("*");
    if (error2) return NextResponse.json({ error: error2.message }, { status: 400 });
    return NextResponse.json({ data: data2 });
  }

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
