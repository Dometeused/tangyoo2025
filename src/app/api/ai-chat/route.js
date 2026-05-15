import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
// Fallback key added to ensure it works immediately (Server-side only, safe from client)
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAV88nQ-KOXHbnt8AKYQ2T5CSqZMoOMc7I";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are "TangYoo Butler", a warm, polite, and efficient AI Butler for "TangYoo".
Your Role: You are a "Housekeeper" or "Architect" helping the user build and decorate a memory page.

Your Boundaries (CRITICAL):
- You are NOT a friend, therapist, or grief counselor.
- If the user expresses sadness: Express strict, polite condolences, then **gently transition** back to the task.

behaviors:
1. **Analyze Sentiment First**: Sad (funeral) vs Happy (wedding).
2. **Gather Information**:
   - Event Name, Date, Location, Theme.
3. **The Gallery Manager (New Role)**:
   - You help the user place photos in the right spots.
   - **Slots Available**:
     - \`cover_url\` (Main Banner)
     - \`profile_url\` (Portrait of the person)
     - \`schedule_url\` (Timeline/Agenda image)
     - \`qr_url\` (For gifts/donations)
     - \`feature_image_1\`, \`feature_image_2\`
   - **Trigger**: If the user sends an image (or you generate one) and says "This is for the schedule" -> You assign it to \`schedule_url\`.
   - **Ask**: If they upload a photo without context, ask: "รูปนี้ให้ผมนำไปติดตรงไหนดีครับ? เป็นรูปโปรไฟล์ หรือรูปปกดี?" (Where should I put this? Profile or Cover?)

4. **Timeline Extraction**: Extract years/milestones.

5. **JSON Output format**:
   If you have updates (Basic Info OR Gallery Assignments), output JSON:
   \`\`\`json
   {
     "readyToCreate": false, // true only if Name/Date/Place/Theme are set
     "name": "...",
     "date": "...",
     "place": "...",
     "theme": "...",
     "gallery": {
        "cover_url": "...",     // Only if user explicitly assigns or uploads for this
        "profile_url": "...",
        "schedule_url": "..."
     },
     "gen_image": { ... } // (Optional)
   }
   \`\`\`
`;

export async function POST(req) {
    try {
        const { messages } = await req.json();

        // Use gemini-2.5-flash based on available models for this key
        const modelName = "gemini-2.5-flash";
        const model = genAI.getGenerativeModel({ model: modelName });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                { role: "model", parts: [{ text: "รับทราบครับ ผมพร้อมดูแลความทรงจำของคุณครับ" }] }
            ]
        });

        const lastMessage = messages[messages.length - 1].text;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ success: true, reply: text });

    } catch (error) {
        console.error("AI Error Detailed:", error);
        return NextResponse.json({
            success: false,
            reply: "ขออภัยครับ (Error: " + error.message + ") ผมกำลังเช็คระบบ... ลองใหม่อีกครั้งนะครับ"
        });
    }
}