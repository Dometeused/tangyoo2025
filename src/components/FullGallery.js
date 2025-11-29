"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  listGalleryImages,
  fetchGalleryCaptions,
  deleteGalleryImage,
  updateGalleryCaption,
  setFeaturedImage,
  setCoverImage,
  setProfileImage,
} from "@/lib/gallery";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppMode } from "@/context/AppModeContext";

export default function FullGallery() {
  const { id: eventId } = useParams();
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { theme, phase } = useAppMode();

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkOwner() {
      if (!eventId) return;

      const { data: { user } } = await supabase.auth.getUser();
      const savedEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

      const { data: eventData } = await supabase
        .from("events")
        .select("email")
        .eq("id", eventId)
        .single();

      const normalizedUser = user?.email?.trim().toLowerCase();
      const normalizedLocal = savedEmail?.trim().toLowerCase();
      const normalizedOwner = eventData?.email?.trim().toLowerCase();

      const match = normalizedUser === normalizedOwner || normalizedLocal === normalizedOwner;
      setIsOwner(match);
    }

    checkOwner();
  }, [eventId]);

  useEffect(() => {
    async function fetchImages() {
      const urls = await listGalleryImages(eventId);
      const captions = await fetchGalleryCaptions(eventId);

      const captionMap = {};
      const featuredMap = {};
      const coverMap = {};
      const profileMap = {};

      for (const item of captions) {
        captionMap[item.filename] = item.caption;
        featuredMap[item.filename] = item.is_featured;
        coverMap[item.filename] = item.is_cover;
        profileMap[item.filename] = item.is_profile;
      }

      const enriched = urls.map((url) => {
        const filename = url.split("/").pop();
        return {
          src: url,
          caption: captionMap[filename] || "",
          is_featured: featuredMap[filename] || false,
          is_cover: coverMap[filename] || false,
          is_profile: profileMap[filename] || false,
        };
      });

      setGallery(enriched);
    }

    if (eventId) fetchImages();
  }, [eventId]);

  async function handleDelete(index) {
    const confirmDelete = confirm("คุณแน่ใจว่าจะลบภาพนี้?");
    if (!confirmDelete) return;

    const img = gallery[index];
    const filename = img.src.split("/").pop();
    const { error } = await deleteGalleryImage(eventId, filename);
    if (!error) {
      const newGallery = [...gallery];
      newGallery.splice(index, 1);
      setGallery(newGallery);
    }
  }

  async function handleEdit(index, caption) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();
    const { error } = await updateGalleryCaption(eventId, filename, caption);
    if (!error) {
      const newGallery = [...gallery];
      newGallery[index].caption = caption;
      setGallery(newGallery);
    }
  }

  async function handleSetFeatured(index) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();
    const { error } = await setFeaturedImage(eventId, filename);
    if (!error) {
      const updated = gallery.map((item, i) => ({
        ...item,
        is_featured: i === index,
      }));
      setGallery(updated);
    }
  }

  async function handleSetCover(index) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();
    const { error } = await setCoverImage(eventId, filename);
    if (!error) {
      const updated = gallery.map((item, i) => ({
        ...item,
        is_cover: i === index,
      }));
      setGallery(updated);
    }
  }

  async function handleSetProfile(index) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();
    const { error } = await setProfileImage(eventId, filename);
    if (!error) {
      const updated = gallery.map((item, i) => ({
        ...item,
        is_profile: i === index,
      }));
      setGallery(updated);
    }
  }

  async function handleUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/gallery/upload?eventId=${eventId}`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!result.success) {
        alert(`อัปโหลดรูป ${file.name} ไม่สำเร็จ`);
      }
    }

    setUploading(false);
    location.reload();
  }

  return (
    <main className="min-h-screen p-4 bg-white">
      <h1 className="text-xl font-bold mb-2 text-gray-900">แกลเลอรีทั้งหมด</h1>
      <div className="text-xs text-gray-500 mb-4">
        <p>🧪 Event ID: {eventId || "ไม่มี"}</p>
        <p>🧪 Owner: {isOwner ? "✅" : "❌"}</p>
        <p>🧪 Theme: {theme}</p>
        <p>🧪 Phase: {phase}</p>
      </div>

      {isOwner && (
        <div className="mb-6">
          <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
            📤 อัปโหลดภาพใหม่
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((img, index) => (
          <div key={index} className="relative border rounded-lg shadow overflow-hidden">
            <img
              src={img.src}
              alt={`image-${index}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="text-sm text-gray-800 truncate">{img.caption}</p>
              {isOwner && (
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <button onClick={() => handleSetFeatured(index)} className={`px-2 py-1 rounded border ${img.is_featured ? "bg-yellow-200" : "bg-gray-100"}`}>
                    ตั้งเป็น Featured
                  </button>
                  <button onClick={() => handleSetCover(index)} className={`px-2 py-1 rounded border ${img.is_cover ? "bg-green-200" : "bg-gray-100"}`}>
                    ตั้งเป็น Cover
                  </button>
                  <button onClick={() => handleSetProfile(index)} className={`px-2 py-1 rounded border ${img.is_profile ? "bg-blue-200" : "bg-gray-100"}`}>
                    ตั้งเป็น Profile
                  </button>
                  <button onClick={() => handleDelete(index)} className="px-2 py-1 rounded border bg-red-100 text-red-700">
                    ลบ
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}