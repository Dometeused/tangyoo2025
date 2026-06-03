import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { eventId, password } = await req.json();
    if (!eventId || !password) {
      return NextResponse.json({ success: false, error: "missing fields" }, { status: 400 });
    }

    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUUID = UUID_RE.test(eventId);

    const query = supabaseAdmin
      .from("events")
      .select("id, event_password, is_private");

    const { data: event, error } = isUUID
      ? await query.or(`id.eq.${eventId},slug.eq.${eventId}`).single()
      : await query.eq("slug", eventId).single();

    if (error || !event) {
      return NextResponse.json({ success: false, error: "event not found" }, { status: 404 });
    }

    if (!event.is_private)      return NextResponse.json({ success: true });
    if (!event.event_password)  return NextResponse.json({ success: true });

    const match = event.event_password.trim() === password.trim();
    return NextResponse.json(
      match ? { success: true } : { success: false, error: "wrong password" },
      { status: match ? 200 : 401 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
