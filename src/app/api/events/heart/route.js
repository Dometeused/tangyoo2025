import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET: read current heart_count
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase
      .from("events")
      .select("heart_count")
      .eq("id", eventId)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, count: data?.heart_count || 0 });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST: increment heart_count
export async function POST(req) {
  try {
    const { eventId } = await req.json();
    if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("heart_count")
      .eq("id", eventId)
      .maybeSingle();

    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

    const newCount = (event?.heart_count || 0) + 1;

    const { error: updateError } = await supabase
      .from("events")
      .update({ heart_count: newCount })
      .eq("id", eventId);

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
    return NextResponse.json({ success: true, count: newCount });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
