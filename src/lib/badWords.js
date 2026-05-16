/**
 * Bad words list for profanity filtering
 * Used in: /api/guestbook POST
 */

const BAD_WORDS_TH = [
  // คำหยาบไทย — ระดับรุนแรง
  "สัตว์", "ไอ้สัตว์", "อีสัตว์",
  "หน้าหี", "หน้าสัตว์", "หน้าควย",
  "ควย", "หี", "เย็ด", "สวาท",
  "อีดอก", "ไอ้ดอก", "อีนังดอก",
  "อีสัส", "ไอ้สัส", "สัสๆ",
  "มึง", "กู", "แม่งโคตร", "โคตรแม่",
  "ไปตาย", "ตายไปเลย", "อยากตาย",
  "บ้าหี", "บ้าควย",
  "อีบ้า", "ไอ้บ้า", "อีโง่", "ไอ้โง่",
  "อีอวบ", "อีอ้วน", "ไอ้อ้วน",
  // คำที่ใช้ด่า (context-dependent แต่ block ไว้ก่อน)
  "ไอ้ชาติหมา", "อีชาติหมา",
  "เย็ดแม่", "แม่มึง", "พ่อมึง",
  "ไอ้เหี้ย", "อีเหี้ย",
  "ควาย", // บางบริบทด่า
  "อีดอกทอง",
  "กะหรี่",
  "โสเภณี",
];

const BAD_WORDS_EN = [
  "fuck", "fucker", "fucking", "fucked",
  "shit", "bullshit",
  "bitch", "bastard",
  "asshole", "ass",
  "cunt", "dick", "cock", "pussy",
  "whore", "slut",
  "nigger", "nigga",
  "faggot", "fag",
  "retard", "retarded",
  "motherfucker", "mf",
  "wtf", "stfu",
];

// ทุก word ในรูป lowercase เพื่อ match case-insensitive
const ALL_BAD_WORDS = [
  ...BAD_WORDS_TH,
  ...BAD_WORDS_EN.map((w) => w.toLowerCase()),
];

/**
 * ตรวจสอบว่าข้อความมีคำหยาบไหม
 * @param {string} text
 * @returns {{ found: boolean, word: string|null }}
 */
export function containsBadWord(text) {
  if (!text) return { found: false, word: null };
  const lower = text.toLowerCase();

  for (const word of ALL_BAD_WORDS) {
    if (lower.includes(word.toLowerCase())) {
      return { found: true, word };
    }
  }
  return { found: false, word: null };
}

/**
 * ตรวจสอบหลายฟิลด์พร้อมกัน
 * @param {string[]} texts
 * @returns {{ found: boolean, word: string|null }}
 */
export function checkFields(...texts) {
  for (const text of texts) {
    const result = containsBadWord(text);
    if (result.found) return result;
  }
  return { found: false, word: null };
}
