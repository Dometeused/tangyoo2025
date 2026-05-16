import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { checkFields } from "@/lib/badWords";

export async function POST(req) {
  try {
    const body = await req.json();
    const { memoryId, name, message, prompt, imageUrl } = body;

    if (!memoryId || !name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── Profanity filter ──────────────────────────────────────────
    const { found } = checkFields(name, message, prompt);
    if (found) {
      return NextResponse.json(
        { error: "ข้อความของคุณมีคำที่ไม่เหมาะสม กรุณาแก้ไขก่อนส่งอีกครั้ง" },
        { status: 422 }
      );
    }
    // ─────────────────────────────────────────────────────────────

    const { data, error } = await supabaseAdmin.from("guestbook").insert([
      {
        memory_id: memoryId,
        name,
        message,
        prompt,
        image_url: imageUrl || null,
      },
    ]).select("*").single();

    if (error) {
      return NextResponse.json({ error: "Failed to insert" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const memoryId = searchParams.get("memoryId");

    if (!memoryId) {
      return NextResponse.json({ error: "Missing memoryId" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("guestbook")
      .select("*")
      .eq("memory_id", memoryId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("guestbook").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
