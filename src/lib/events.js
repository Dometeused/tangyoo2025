// 📄 src/lib/events.js
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getEventById(id) {
  const supabase = createClientComponentClient();

  // Try slug first, fallback UUID
  let data = null;
  const { data: bySlug } = await supabase
    .from("events")
    .select("*")
    .eq("slug", id)
    .single();
  if (bySlug) {
    data = bySlug;
  } else {
    const { data: byId, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("❌ getEventById Error:", error.message);
      return null;
    }
    data = byId;
  }

  // Strip password — never expose to client
  if (data) delete data.event_password;
  return data;
}
