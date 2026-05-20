import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `คุณคือ AI ที่ช่วยแยกข้อมูลงานอีเวนต์จากข้อความภาษาไทยหรืออังกฤษ
ให้ตอบกลับเป็น JSON เท่านั้น ไม่มีข้อความอื่น ไม่มี markdown

Fields ที่ต้องแยก:
- theme: "wedding" | "funeral" | "anniversary" | "baby" (เดาจากบริบท ถ้าไม่แน่ใจใช้ "wedding")
- name: ชื่องาน หรือชื่อเจ้าบ่าว/เจ้าสาว หรือชื่อผู้เสียชีวิต (string)
- date: วันที่ในรูปแบบ YYYY-MM-DD (ถ้าไม่มีให้ใช้ "")
- place: สถานที่จัดงาน (string, ถ้าไม่มีให้ใช้ "")
- confidence: 0-100 ความมั่นใจโดยรวม

ตัวอย่าง input: "งานแต่งงาน เอ & บี วันที่ 20 ธันวาคม ที่โรงแรม Mandarin"
ตัวอย่าง output: {"theme":"wedding","name":"เอ & บี","date":"2025-12-20","place":"โรงแรม Mandarin","confidence":95}`;

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "กรุณาใส่ข้อความ" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: text.trim() }],
    });

    const raw = message.content[0]?.text?.trim() || "{}";

    // parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "วิเคราะห์ไม่สำเร็จ กรุณาลองใหม่" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (err) {
    console.error("ai-parse-event error:", err);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด กรุณาลองใหม่" }, { status: 500 });
  }
}
