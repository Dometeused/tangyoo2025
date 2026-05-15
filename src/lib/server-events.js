// src/lib/server-events.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getEventById(eventId) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();
  if (error) return null;
  return data;
}
