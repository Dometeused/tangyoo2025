"use client";
import { useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

export default function TestCoverPage() {
  const supabase = createClientComponentClient();
  const [uploading, setUploading] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const eventId = "ded339eb-224b-4fb3-a905-4af3f0db81f5";

  const handleUpload = async (e, type = "cover") => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const filename = `${type}-${uuidv4()}.${fileExt}`; // ชื่อแยก cover / profile
    const filepath = `test/${filename}`; // ✅ ใช้ path เดียวกับที่เคยใช้ได้
    const column = type === "cover" ? "cover_url" : "profile_url";

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from("event-cover")
        .upload(filepath, file, { upsert: true });

      if (uploadError) {
        console.error("❌ Upload error:", uploadError.message);
        alert("Upload failed.");
        return;
      }

      const { data: publicData } = supabase.storage
        .from("event-cover")
        .getPublicUrl(filepath);
      const url = publicData?.publicUrl;

      if (type === "cover") setCoverUrl(url);
      else setProfileUrl(url);

      const { error: updateError } = await supabase
        .from("events")
        .update({ [column]: url })
        .eq("id", eventId)
        .select();

      if (updateError) {
        console.error("❌ DB update error:", updateError);
        alert("Failed to update DB.");
      } else {
        console.log("✅ DB updated:", column, url);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧪 ทดสอบอัปโหลด Cover & Profile Image</h1>

      {/* Cover Upload */}
      <div>
        <label className="block font-semibold mb-1">อัปโหลดภาพปก (Cover)</label>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "cover")} />
        {coverUrl && (
          <div className="mt-3">
            <Image src={coverUrl} alt="Cover" width={600} height={300} className="rounded-xl border" />
            <p className="text-xs text-gray-500 mt-1 break-all">{coverUrl}</p>
          </div>
        )}
      </div>

      {/* Profile Upload */}
      <div>
        <label className="block font-semibold mt-6 mb-1">อัปโหลดรูปโปรไฟล์</label>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "profile")} />
        {profileUrl && (
          <div className="mt-3">
            <Image src={profileUrl} alt="Profile" width={150} height={150} className="rounded-xl border" />
            <p className="text-xs text-gray-500 mt-1 break-all">{profileUrl}</p>
          </div>
        )}
      </div>

      {uploading && <p className="text-orange-500">⏳ กำลังอัปโหลด...</p>}
    </div>
  );
}
