import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabaseAdmin.storage
      .from("gallery")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: "Failed to upload", details: error.message }, { status: 500 });
    }

    const { publicUrl } = supabaseAdmin
      .storage
      .from("gallery")
      .getPublicUrl(filePath).data;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    return NextResponse.json({ error: "Internal error", details: err.message }, { status: 500 });
  }
}
