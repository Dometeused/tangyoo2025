import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { v4 as uuidv4 } from "uuid";
import { checkImageSafety } from "@/lib/visionModerate";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ── Validate file type ────────────────────────────────────────
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "ประเภทไฟล์ไม่รองรับ กรุณาใช้ JPG, PNG, WEBP หรือ GIF" },
        { status: 422 }
      );
    }

    // ── Validate file size ────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "ไฟล์ขนาดใหญ่เกินไป (สูงสุด 5MB)" },
        { status: 422 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ── Google Vision SafeSearch ──────────────────────────────────
    const { safe, reason } = await checkImageSafety(buffer);
    if (!safe) {
      return NextResponse.json({ error: reason }, { status: 422 });
    }
    // ─────────────────────────────────────────────────────────────

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `guestbook-images/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("guestbook-images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin
      .storage
      .from("guestbook-images")
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      return NextResponse.json({ error: "Failed to get public URL" }, { status: 500 });
    }

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error", details: err.message }, { status: 500 });
  }
}
