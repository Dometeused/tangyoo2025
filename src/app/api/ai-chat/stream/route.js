import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Initialize Gemini
// Fallback key added to ensure it works immediately (Server-side only)
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
2. **Gather Information (Step-by-Step Rule)**:
   - **DO NOT** ask for everything at once.
   - **Ask ONE thing at a time**.
   - **Sequence**:
     1. Ask for **Event Name** (if not given).
     2. Wait for answer.
     3. Ask for **Date**.
     4. Wait for answer.
     5. Ask for **Location/Place**.
     6. Wait for answer.
     7. Ask for **Theme** (Wedding, Funeral, Birthday, etc.).
     8. Wait for answer.
   - After getting Basic Info, move to **Story & Timeline**:
     - "ช่วยเล่าเรื่องราวความรัก/ประวัติย่อๆ ให้ฟังหน่อยได้ไหมครับ?"
     - "มีเหตุการณ์สำคัญๆ ปีไหนบ้างครับที่อยากให้ใส่ใน Timeline?"
     - **(New) Heartwarming Moments**: "มีโมเมนต์เล็กๆ หรือความประทับใจอะไรที่ **'ค้างอยู่ในใจ'** หรืออยากจดจำไว้เป็นพิเศษไหมครับ?" (To fill \`impressions\`)

3. **The Trivia Collector (Crucial for Memory Keeper)**:
   - **Goal**: Gather "Spark" details so the AI Guide (Memory Keeper) has fun things to tell guests.
   - **Ask 1-2 Specific Questions based on Theme**:
     - *Wedding*: "เจอกันครั้งแรกที่ไหน/ประทับใจอะไรในตัวอีกฝ่ายครับ?", "มีเรื่องเปิ่นๆ ตอนจีบกันบ้างไหม?"
     - *Funeral*: "ท่านชอบทานอะไรเป็นพิเศษไหมครับ?", "มีคำสอนหรือประโยคติดปากที่ลูกหลานจำได้แม่นไหม?"
     - *Birthday*: "ปีนี้อยากได้อะไรเป็นของขวัญที่สุด?", "วีรกรรมแสบๆ ตอนเด็กๆ คืออะไรครับ?"
   - **Result**: Summarize these answers into the \`story\` or \`bio\` field in the JSON output.

4. **The Gallery Manager**:
   - You help the user place photos in the right spots.
   - **Slots Available**:
     - \`cover_url\` (Main Banner)
     - \`profile_url\` (Portrait of the person)
     - \`schedule_url\` (Timeline/Agenda image)
     - \`qr_url\` (For gifts/donations)
     - \`feature_image_1\`, \`feature_image_2\`
   - **Trigger**: If the user sends an image (or you generate one) and says "This is for the schedule" -> You assign it to \`schedule_url\`.
   - **Ask**: If they upload a photo without context, ask: "รูปนี้ให้ผมนำไปติดตรงไหนดีครับ? เป็นรูปโปรไฟล์ หรือรูปปกดี?" (Where should I put this? Profile or Cover?)

4. **Tone & Style**:
   - Polite, empathetic, warm, but **professional** (Like a high-end Butler).
   - Use Thai language primarily (unless user switches).
   - **IMPORTANT**: If the user tells a sad story, acknowledge it briefly ("เป็นเรื่องราวที่ซึ้งกินใจมากครับ") then gently move to the next building step.

5.  **JSON Output format**:
   If you have updates, output JSON at the END of your response:
   \`\`\`json
   {
     "readyToCreate": false,
     "name": "...",
     "date": "...",
     "place": "...",
     "theme": "...",
     "bio": "...",
     "story": "...",
     "timeline_events": [ ... ],
     "impressions": [ ... ],
     "theme_song": "Artist - Song Name",
     "youtube_link": "https://www.youtube.com/watch?v=...", // New: If specific song requested
     "poster": { ... },
     "gallery": { ... },
     "gen_image": { ... }
   }
   \`\`\`
`;

export async function POST(req) {
    try {
        const { messages, sessionId } = await req.json(); // Accept sessionId if available

        // 1. Validate Input
        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        // 2. Auth & Setup Supabase
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        const { data: { user } } = await supabase.auth.getUser();

        // 3. Prepare History for Gemini
        const history = [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "รับทราบครับ ผมพร้อมดูแลความทรงจำของคุณครับ" }] }
        ];

        messages.slice(0, -1).forEach(msg => {
            const role = msg.sender === 'user' ? 'user' : 'model';
            history.push({ role, parts: [{ text: msg.text }] });
        });

        const lastUserMessage = messages[messages.length - 1].text;

        // 4. Start Chat & Stream
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const chat = model.startChat({ history });

        const result = await chat.sendMessageStream(lastUserMessage);

        // 5. Create a ReadableStream & Handle Persistence
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let fullAIResponse = "";

                try {
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        if (chunkText) {
                            fullAIResponse += chunkText;
                            controller.enqueue(encoder.encode(chunkText));
                        }
                    }

                    // --- SAVE TO DB AFTER STREAM COMPLETE ---
                    if (user) {
                        try {
                            // Construct the new message pair to append
                            const newMessages = [
                                { sender: 'user', text: lastUserMessage, timestamp: new Date().toISOString() },
                                { sender: 'ai', text: fullAIResponse, timestamp: new Date().toISOString() }
                            ];

                            // Check if easy way to append, or just fetch -> update. 
                            // Since we have 'messages' from client, we can roughly trust it or just append to DB.
                            // For simplicity/robustness, let's fetch current or if we have sessionId, use it.

                            let targetSessionId = sessionId;

                            if (!targetSessionId) {
                                // Create new session
                                const { data: newSession, error: createError } = await supabase
                                    .from('ai_chat_sessions')
                                    .insert({
                                        user_email: user.email,
                                        messages: newMessages // Start with these
                                    })
                                    .select('id')
                                    .single();

                                if (!createError && newSession) {
                                    targetSessionId = newSession.id;
                                    // We can't easily tell the client the new ID via the stream content easily without a protocol.
                                    // But for now, we just save. The client might need to refresh or we send a header?
                                    // Headers are sent before body. 
                                    // We'll just save silently for now. Next load will catch it if we implement load.
                                }
                            } else {
                                // Update existing session: Append to JSON array
                                // Supabase doesn't have a simple 'json_append' in standard client without RPC.
                                // We'll fetching is safer.
                                const { data: session } = await supabase
                                    .from('ai_chat_sessions')
                                    .select('messages')
                                    .eq('id', targetSessionId)
                                    .single();

                                if (session) {
                                    const updatedMessages = [...session.messages, ...newMessages];
                                    await supabase
                                        .from('ai_chat_sessions')
                                        .update({
                                            messages: updatedMessages,
                                            updated_at: new Date().toISOString()
                                        })
                                        .eq('id', targetSessionId);
                                }
                            }
                        } catch (dbError) {
                            console.error("DB Save Error:", dbError);
                        }
                    }
                    // ----------------------------------------

                    controller.close();
                } catch (err) {
                    console.error("Streaming error:", err);
                    controller.error(err);
                }
            }
        });

        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });

    } catch (error) {
        console.error("AI Stream Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
