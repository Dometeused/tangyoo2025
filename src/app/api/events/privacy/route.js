import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ success: false, error: "unauthenticated" }, { status: 401 });
  }

  const { eventId, isPrivate, password } = await req.json();
  if (!eventId) {
    return NextResponse.json({ success: false, error: "missing eventId" }, { status: 400 });
  }

  // Verify ownership
  const { data: event } = await supabaseAdmin
    .from("events")
    .select("id, user_id")
    .eq("id", eventId)
    .single();

  if (!event || event.user_id !== user.id) {
    return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
  }

  const updates = { is_private: isPrivate };
  if (password !== undefined) updates.event_password = password || null;

  const { error } = await supabaseAdmin
    .from("events")
    .update(updates)
    .eq("id", eventId);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
