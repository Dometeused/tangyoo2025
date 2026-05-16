/**
 * Google Cloud Vision SafeSearch moderation
 * ใช้ REST API (ไม่ต้องติดตั้ง SDK)
 *
 * ต้องตั้ง env var: GOOGLE_VISION_API_KEY
 * วิธีขอ key: https://console.cloud.google.com → APIs & Services → Credentials
 * เปิด API: Cloud Vision API
 */

const LIKELIHOOD_SCORE = {
  UNKNOWN: 0,
  VERY_UNLIKELY: 1,
  UNLIKELY: 2,
  POSSIBLE: 3,
  LIKELY: 4,
  VERY_LIKELY: 5,
};

const BLOCK_THRESHOLD = 4; // LIKELY ขึ้นไป = block

/**
 * ตรวจสอบรูปภาพด้วย Google Vision SafeSearch
 * @param {Buffer} imageBuffer
 * @returns {{ safe: boolean, reason: string|null }}
 */
export async function checkImageSafety(imageBuffer) {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;

  // ถ้าไม่มี API key — ข้ามการตรวจ (ไม่ block)
  if (!apiKey) {
    console.warn("[Vision] GOOGLE_VISION_API_KEY not set — skipping moderation");
    return { safe: true, reason: null };
  }

  try {
    const base64 = imageBuffer.toString("base64");

    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64 },
              features: [{ type: "SAFE_SEARCH_DETECTION", maxResults: 1 }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      console.error("[Vision] API error:", res.status, await res.text());
      return { safe: true, reason: null }; // fail open — ไม่ block ถ้า Vision error
    }

    const json = await res.json();
    const annotation = json.responses?.[0]?.safeSearchAnnotation;

    if (!annotation) return { safe: true, reason: null };

    const adult = LIKELIHOOD_SCORE[annotation.adult] ?? 0;
    const violence = LIKELIHOOD_SCORE[annotation.violence] ?? 0;
    const racy = LIKELIHOOD_SCORE[annotation.racy] ?? 0;

    if (adult >= BLOCK_THRESHOLD) {
      return { safe: false, reason: "รูปภาพนี้มีเนื้อหาไม่เหมาะสม (adult content)" };
    }
    if (violence >= BLOCK_THRESHOLD) {
      return { safe: false, reason: "รูปภาพนี้มีเนื้อหาความรุนแรง" };
    }
    if (racy >= BLOCK_THRESHOLD) {
      return { safe: false, reason: "รูปภาพนี้มีเนื้อหาไม่เหมาะสม" };
    }

    return { safe: true, reason: null };
  } catch (err) {
    console.error("[Vision] Unexpected error:", err);
    return { safe: true, reason: null }; // fail open
  }
}
