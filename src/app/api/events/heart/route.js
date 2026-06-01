import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public client — heart count is readable by anyone (no auth needed)
function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// GET: read current heart_count
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    if (!eventId) return NextResponse.json({ success: true, count: 0 });

    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from("events")
      .select("heart_count")
      .eq("id", eventId)
      .maybeSingle();

    // If column doesn't exist or any error → return 0 gracefully (not 500)
    if (error) return NextResponse.json({ success: true, count: 0 });
    return NextResponse.json({ success: true, count: data?.heart_count || 0 });
  } catch {
    return NextResponse.json({ success: true, count: 0 });
  }
}

// POST: increment heart_count
export async function POST(req) {
  try {
    const { eventId } = await req.json();
    if (!eventId) return NextResponse.json({ success: true, count: 0 });

    const supabase = getPublicClient();
    const { data: event } = await supabase
      .from("events")
      .select("heart_count")
      .eq("id", eventId)
      .maybeSingle();

    const newCount = (event?.heart_count || 0) + 1;

    await supabase
      .from("events")
      .update({ heart_count: newCount })
      .eq("id", eventId);

    return NextResponse.json({ success: true, count: newCount });
  } catch {
    return NextResponse.json({ success: true, count: 0 });
  }
}
