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
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrashAlt,
  FaStar,
  FaImage,
  FaUserCircle,
  FaEdit,
  FaCloudUploadAlt,
  FaTimes,
  FaCheck
} from "react-icons/fa";
import { THEMES } from "@/data/themes";
import { compressImage } from "@/lib/compressImage";

export default function FullGallery() {
  const { id: eventId } = useParams();
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState(""); // "" | "success" | "error"
  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { theme, phase } = useAppMode();

  // Theme Logic
  const currentTheme = THEMES.find(t => t.key === theme);
  const bgClass = currentTheme ? currentTheme.bg : "bg-gradient-to-b from-gray-50 to-white";
  const textClass = currentTheme ? currentTheme.text : "text-gray-800";

  // Lightbox State
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
  }, [eventId, supabase]);

  useEffect(() => {
    fetchImages();
  }, [eventId]);

  async function fetchImages() {
    if (!eventId) return;
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

  async function handleDelete(index) {
    if (!confirm("คุณแน่ใจว่าจะลบภาพนี้?")) return;

    const img = gallery[index];
    const filename = img.src.split("/").pop();
    const { error } = await deleteGalleryImage(eventId, filename);
    if (!error) {
      const newGallery = [...gallery];
      newGallery.splice(index, 1);
      setGallery(newGallery);
    }
  }

  async function handleSetFeatured(index) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();

    // Optimistic toggle (checkbox — ไม่ reset อันอื่น)
    const oldGallery = [...gallery];
    const newGallery = gallery.map((item, i) =>
      i === index ? { ...item, is_featured: !item.is_featured } : item
    );
    setGallery(newGallery);

    const { error } = await setFeaturedImage(eventId, filename);
    if (error) setGallery(oldGallery);
  }

  async function handleSetCover(index) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();

    // Optimistic Update
    const oldGallery = [...gallery];
    const newGallery = gallery.map((item, i) => ({
      ...item,
      is_cover: i === index ? !item.is_cover : false
    }));
    setGallery(newGallery);

    const { error } = await setCoverImage(eventId, filename);
    if (error) {
      setGallery(oldGallery);
    }
  }

  async function handleSetProfile(index) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();

    // Optimistic Update
    const oldGallery = [...gallery];
    const newGallery = gallery.map((item, i) => ({
      ...item,
      is_profile: i === index ? !item.is_profile : false
    }));
    setGallery(newGallery);

    const { error } = await setProfileImage(eventId, filename);
    if (error) {
      setGallery(oldGallery);
    }
  }

  async function handleUpdateCaption(index, newCaption) {
    const img = gallery[index];
    const filename = img.src.split("/").pop();

    // Optimistic Update
    const newGallery = [...gallery];
    newGallery[index].caption = newCaption;
    setGallery(newGallery);

    const { error } = await updateGalleryCaption(eventId, filename, newCaption);
    if (error) {
    }
  }

  async function handleUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadToast("");

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
      try {
        // บีบอัดก่อน upload: max 1920px, quality 82%
        const compressed = await compressImage(file, { maxWidth: 1920, maxHeight: 1920, quality: 0.82 });
        const formData = new FormData();
        formData.append("file", compressed);
        const res = await fetch(`/api/gallery/upload?eventId=${eventId}`, {
          method: "POST",
          body: formData,
        });
        if (res.ok) successCount++;
        else errorCount++;
      } catch {
        errorCount++;
      }
    }

    setUploading(false);
    await fetchImages();

    if (errorCount === 0) {
      setUploadToast(`✓ อัปโหลดสำเร็จ ${successCount} รูป`);
    } else {
      setUploadToast(`⚠ สำเร็จ ${successCount} / ไม่สำเร็จ ${errorCount} รูป`);
    }
    setTimeout(() => setUploadToast(""), 4000);
  }

  const slides = gallery.map((img) => ({
    src: img.src,
    description: img.caption // Map caption to description for Lightbox
  }));

  return (
    <main className={`min-h-screen p-4 md:p-8 font-kanit transition-colors duration-500 ${bgClass} ${textClass}`}>

      {/* Header & Controls */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold drop-shadow-sm">แกลเลอรีความทรงจำ</h1>
          <p className="opacity-80 text-sm mt-1">รวมภาพประทับใจทั้งหมด {gallery.length} รูป</p>
        </div>

        {isOwner && (
          <div className="flex gap-3">
            <label className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer transition-all shadow-md
              ${uploading ? "bg-gray-300 pointer-events-none" : "bg-black text-white hover:bg-gray-800 hover:shadow-lg"}
            `}>
              <FaCloudUploadAlt className="text-lg" />
              <span>{uploading ? "กำลังอัปโหลด..." : "อัปโหลดรูป"}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full transition-all shadow-md
                ${editMode ? "bg-yellow-100 text-yellow-700 border border-yellow-300" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"}
              `}
            >
              {editMode ? <><FaCheck /> เสร็จสิ้น</> : <><FaEdit /> จัดการรูป</>}
            </button>
          </div>
        )}
      </div>

      {/* Upload Toast */}
      {uploadToast && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${uploadToast.startsWith("✓") ? "bg-green-500" : "bg-orange-500"}`}>
          {uploadToast}
        </div>
      )}

      {/* Masonry Grid */}
      {gallery.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 max-w-7xl mx-auto space-y-4">
          <AnimatePresence>
            {gallery.map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white"
              >
                <img
                  src={img.src}
                  alt={`gallery-${index}`}
                  className="w-full h-auto object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                  onClick={() => {
                    setLightboxIndex(index);
                    setOpenLightbox(true);
                  }}
                />

                {/* Caption Overlay on Hover */}
                {img.caption && !editMode && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-white text-sm font-light drop-shadow-md truncate">{img.caption}</p>
                  </div>
                )}

                {/* Badges (Always Visible) */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {img.is_featured && <span className="bg-yellow-400/90 text-white text-[10px] px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">Featured</span>}
                  {img.is_cover && <span className="bg-green-500/90 text-white text-[10px] px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">Cover</span>}
                  {img.is_profile && <span className="bg-blue-500/90 text-white text-[10px] px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">Profile</span>}
                </div>

                {/* Edit Mode Overlays */}
                {isOwner && editMode && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <button
                        onClick={() => handleSetFeatured(index)}
                        className={`p-3 rounded-full shadow-lg hover:scale-110 transition ${img.is_featured ? "bg-yellow-400 text-white" : "bg-white text-gray-400"}`}
                        title="ตั้งเป็น Featured"
                      >
                        <FaStar />
                      </button>
                      <button
                        onClick={() => handleSetCover(index)}
                        className={`p-3 rounded-full shadow-lg hover:scale-110 transition ${img.is_cover ? "bg-green-500 text-white" : "bg-white text-gray-400"}`}
                        title="ตั้งเป็น Cover"
                      >
                        <FaImage />
                      </button>
                      <button
                        onClick={() => handleSetProfile(index)}
                        className={`p-3 rounded-full shadow-lg hover:scale-110 transition ${img.is_profile ? "bg-blue-500 text-white" : "bg-white text-gray-400"}`}
                        title="ตั้งเป็น Profile"
                      >
                        <FaUserCircle />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-3 rounded-full shadow-lg bg-white text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition"
                        title="ลบรูป"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="เพิ่มคำบรรยาย..."
                        className="w-full bg-white/20 border border-white/30 text-white text-sm px-3 py-1.5 rounded-lg placeholder-white/50 focus:outline-none focus:bg-white/30 transition"
                        defaultValue={img.caption}
                        onBlur={(e) => handleUpdateCaption(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateCaption(index, e.currentTarget.value);
                            e.currentTarget.blur();
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center py-20 opacity-50 ${textClass}`}>
          <div className="text-6xl mb-4 opacity-70">🖼️</div>
          <p>ยังไม่มีรูปในแกลเลอรี</p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Captions]}
        callbacks={{
          view: ({ index }) => setLightboxIndex(index),
        }}
        captions={{ showToggle: true, descriptionTextAlign: 'center' }}
      />
    </main>
  );
}