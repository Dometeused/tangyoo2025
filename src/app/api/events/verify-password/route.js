import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { eventId, password } = await req.json();
    if (!eventId || !password) {
      return NextResponse.json({ success: false, error: "missing fields" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: event, error } = await supabase
      .from("events")
      .select("id, event_password, is_private")
      .or(`id.eq.${eventId},slug.eq.${eventId}`)
      .single();

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
