"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function GalleryGridImage({ file, eventId, index, onClick, onDeleted }) {
  const [hovering, setHovering] = useState(false);
  const supabase = createClientComponentClient();

  const imageUrl = supabase
    .storage
    .from("user-gallery")
    .getPublicUrl(`${eventId}/${file.name}`)
    .data.publicUrl;

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm("ลบรูปนี้?");
    if (!confirmed) return;

    const { error } = await supabase
      .storage
      .from("user-gallery")
      .remove([`${eventId}/${file.name}`]);

    if (error) {
      alert("ลบไม่สำเร็จ");
      console.error(error);
    } else {
      if (onDeleted) onDeleted(file.name);
    }
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => onClick && onClick(index)}
    >
      <img
        src={imageUrl}
        alt={file.name}
        className="w-full aspect-square object-cover rounded-lg border border-gray-700 shadow hover:ring-2 hover:ring-blue-500 transition"
      />
      {hovering && (
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md shadow hover:bg-red-700 z-10"
        >
          ลบ
        </button>
      )}
    </div>
  );
}
