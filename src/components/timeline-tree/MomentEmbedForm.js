import React, { useState } from "react";

export default function MomentEmbedForm({ value, onChange }) {
  const [url, setUrl] = useState(value?.url || "");
  const [caption, setCaption] = useState(value?.caption || "");

  // แปลงลิงก์ YouTube/TikTok/Facebook ฯลฯ ให้ฝัง iframe ได้
  const renderPreview = () => {
    // YouTube
    if (/youtube\.com|youtu\.be/.test(url)) {
      let id = url.match(/(?:\/|=)([\w-]{11})(?:\?|&|$)/)?.[1];
      if (!id) id = url.match(/youtu\.be\/([\w-]{11})/)?.[1];
      return id ? (
        <iframe
          title="YouTube"
          width="350"
          height="200"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
          className="rounded-xl shadow"
        />
      ) : null;
    }
    // เพิ่ม logic สำหรับ TikTok, FB, Vimeo ฯลฯ (future)
    return null;
  };

  // บอก parent ทุกครั้งที่เปลี่ยน
  const handleChange = (newUrl, newCaption) => {
    setUrl(newUrl);
    setCaption(newCaption);
    onChange && onChange({ url: newUrl, caption: newCaption });
  };

  return (
    <div className="bg-white/70 rounded-2xl p-6 shadow max-w-xl mx-auto">
      <div className="font-bold mb-2">ใส่ลิงก์วิดีโอ/คลิปสำคัญ</div>
      <input
        type="url"
        className="w-full rounded border px-3 py-2 mb-3"
        placeholder="เช่น https://youtu.be/xxxxxxxxxxx"
        value={url}
        onChange={e => handleChange(e.target.value, caption)}
      />
      <textarea
        className="w-full rounded border px-3 py-2 mb-3"
        placeholder="เขียนคำบรรยาย/แคปชั่นประกอบ (ไม่ใส่ก็ได้)"
        value={caption}
        onChange={e => handleChange(url, e.target.value)}
      />
      <div className="mb-3">
        {url ? renderPreview() : <div className="text-gray-400">ใส่ลิงก์เพื่อแสดงตัวอย่างวิดีโอ</div>}
      </div>
      {/* (ถ้าอยากเพิ่ม validate, ปุ่มบันทึก เพิ่มต่อได้) */}
    </div>
  );
}
