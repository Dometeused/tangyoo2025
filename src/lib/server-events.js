// src/lib/server-events.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getEventById(eventId) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Try slug first (short ID like wed-k3m9x), fallback to UUID
  const { data: bySlug } = await supabase
    .from("events")
    .select("*")
    .eq("slug", eventId)
    .single();
  if (bySlug) return bySlug;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();
  if (error) return null;
  return data;
}
