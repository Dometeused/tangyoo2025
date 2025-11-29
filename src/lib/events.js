// 📄 src/lib/events.js
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getEventById(id) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ getEventById Error:", error.message);
    return null;
  }

  return data;
}
