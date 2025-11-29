"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function GalleryGridImage({ image, getUrl, onClick, onDelete, usedIn = [] }) {
  return (
    <div className="...">
      <img src={getUrl(image.name)} alt={image.name} onClick={onClick} />
      {usedIn.length > 0 && <div className="text-xs">{usedIn.join(", ")}</div>}
      <button onClick={onDelete}>ลบ</button>
    </div>
  );
  const imageUrl = supabase
    .storage
    .from("user-gallery")
    .getPublicUrl(`${eventId}/${file.name}`)
    .data.publicUrl;

  const handleDelete = async () => {
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
      onDeleted(file.name);
    }
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img
        src={imageUrl}
        alt={file.name}
        onClick={() => onClick(index)}
        className="w-full aspect-square object-cover rounded-lg border border-gray-700 shadow hover:ring-2 hover:ring-blue-500 transition"
      />
      {hovering && (
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md shadow hover:bg-red-700"
        >
          ลบ
        </button>
      )}
    </div>
  );
}
