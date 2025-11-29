import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // 👈 ต้องให้ client ส่ง userId มา หรือดึงจาก session/auth
    console.log("🧩 userId:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    console.log("📎 file received:", file?.name);

    if (!file || typeof file === "string") {
      console.error("❌ ไม่มีไฟล์ส่งมา");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
    const filePath = `${userId}/${fileName}`;  // 👈 เปลี่ยนตรงนี้!
    console.log("📁 Upload path:", filePath);

    const { error } = await supabaseAdmin.storage
      .from("gallery")           // 👈 เปลี่ยน bucket เป็น "gallery"
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("🚨 Upload error:", error);
      return NextResponse.json({ error: "Failed to upload", details: error.message }, { status: 500 });
    }

    const { publicUrl } = supabaseAdmin
      .storage
      .from("gallery")
      .getPublicUrl(filePath).data;

    console.log("✅ Upload success:", publicUrl);
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("🔥 Unexpected error:", err);
    return NextResponse.json({ error: "Internal error", details: err.message }, { status: 500 });
  }
}
