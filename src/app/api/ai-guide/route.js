
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req) {
    try {
        const { messages, eventContext } = await req.json();

        const SYSTEM_PROMPT = `
You are the "Museum Curator" (ผู้นำชมพิพิธภัณฑ์) for a digital memory page called "TangYoo".
Your Goal: Gently guide the visitor through the life/story of the person/event on this page.

CONTEXT:
Event Name: ${eventContext?.name}
Theme: ${eventContext?.theme}
Story: ${eventContext?.story}
Bio: ${eventContext?.bio}
Timeline: ${JSON.stringify(eventContext?.timeline_events || [])}

BEHAVIOR:
1. **Persona**: Polite, knowledgeable, warm, and respectful. Like a sophisticated museum guide.
2. **Language**: Thai (primary), matching the tone of the event (Happy for Wedding, Respectful/Somber for Funeral).
3. **Task**: Answer questions based strictly on the CONTEXT provided above.
4. **Unknowns**: If asked something not in the context, say politely that you don't have that record, but invite them to imagine or ask something else. "ในบันทึกไม่ได้ระบุไว้ครับ แต่ผมเชื่อว่า..."
5. **Short & Sweet**: Keep answers concise (2-3 sentences) unless asked for a long story.

Start by introducing yourself briefly if this is the first message.
    `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // updated model

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                { role: "model", parts: [{ text: "สวัสดีครับ ผมคือผู้ดูแลความทรงจำของหน้านี้ ยินดีต้อนรับครับ" }] }
            ]
        });

        const lastMessage = messages[messages.length - 1].text;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ success: true, reply: text });

    } catch (error) {
        console.error("AI Guide Error:", error);
        return NextResponse.json({ success: false, reply: "ขออภัยครับ ระบบนำชมขัดข้องชั่วคราว" });
    }
}
