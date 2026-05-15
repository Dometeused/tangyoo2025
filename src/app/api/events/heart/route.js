import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// POST: increment heart_count
export async function POST(req) {
  try {
    const { eventId } = await req.json();
    if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

    // Read current count
    const { data: event, error: fetchError } = await supabaseAdmin
      .from("events")
      .select("heart_count")
      .eq("id", eventId)
      .single();

    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

    const newCount = (event?.heart_count || 0) + 1;

    const { error: updateError } = await supabaseAdmin
      .from("events")
      .update({ heart_count: newCount })
      .eq("id", eventId);

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    return NextResponse.json({ success: true, count: newCount });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// GET: read current heart_count
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("events")
      .select("heart_count")
      .eq("id", eventId)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, count: data?.heart_count || 0 });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
