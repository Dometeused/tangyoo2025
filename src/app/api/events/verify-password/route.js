import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const { eventId, password } = await req.json();
  if (!eventId || !password) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Lookup by slug first, fallback UUID
  let event = null;
  const { data: bySlug } = await supabaseAdmin
    .from("events")
    .select("id, is_private, event_password")
    .eq("slug", eventId)
    .single();
  if (bySlug) {
    event = bySlug;
  } else {
    const { data: byId } = await supabaseAdmin
      .from("events")
      .select("id, is_private, event_password")
      .eq("id", eventId)
      .single();
    event = byId;
  }

  if (!event || !event.is_private) {
    return NextResponse.json({ success: false, error: "not_private" }, { status: 400 });
  }

  const correct = event.event_password && event.event_password === password;
  if (!correct) {
    return NextResponse.json({ success: false, error: "wrong_password" });
  }

  return NextResponse.json({ success: true });
}
