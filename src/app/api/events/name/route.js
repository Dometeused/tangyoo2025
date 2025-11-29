// /src/app/api/events/name/route.js
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  const { id, name } = await req.json();
  if (!id || !name) {
    return Response.json({ success: false }, { status: 400 });
  }
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase
    .from("events")
    .update({ name })
    .eq("id", id);
  if (error) return Response.json({ success: false }, { status: 500 });
  return Response.json({ success: true });
}

export const dynamic = "force-dynamic";
