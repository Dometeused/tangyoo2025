// 📄 src/lib/gallery.js
import supabase from "@/lib/supabaseClient";

// ✅ GET URLs
export async function listGalleryImages(eventId) {
  const bucket = "gallery";
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(eventId, { limit: 100, offset: 0 });

  if (error || !data) return [];
  return data.map((file) =>
    supabase.storage.from(bucket).getPublicUrl(`${eventId}/${file.name}`).data.publicUrl
  );
}

// ✅ DELETE image + caption
export async function deleteGalleryImage(eventId, filename) {
  const bucket = "gallery";

  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([`${eventId}/${filename}`]);

  if (storageError) return { error: storageError };

  const { error: dbError } = await supabase
    .from("gallery_metadata")
    .delete()
    .eq("event_id", eventId)
    .eq("filename", filename);

  return { error: dbError };
}

// ✅ UPDATE caption
export async function updateGalleryCaption(eventId, filename, caption) {
  const { error } = await supabase
    .from("gallery_metadata")
    .upsert(
      [{ event_id: eventId, filename, caption }],
      { onConflict: ["event_id", "filename"] }
    );

  return { error };
}

// ✅ FETCH captions
export async function fetchGalleryCaptions(eventId) {
  const { data, error } = await supabase
    .from("gallery_metadata")
    .select("filename, caption, is_featured")
    .eq("event_id", eventId);

  if (error) {
    console.error("ดึง caption ผิดพลาด:", error.message);
    return [];
  }

  return data || [];
}

// ✅ GET Featured Image
export async function getFeaturedImage(eventId) {
  const { data, error } = await supabase
    .from("gallery_metadata")
    .select("filename")
    .eq("event_id", eventId)
    .eq("is_featured", true)
    .single();

  if (error || !data) return null;

  const bucket = "gallery";
  const publicUrl = supabase.storage
    .from(bucket)
    .getPublicUrl(`${eventId}/${data.filename}`).data.publicUrl;

  return publicUrl;
}

// ✅ SET Featured Image
export async function setFeaturedImage(eventId, filename) {
  const { error: resetError } = await supabase
    .from("gallery_metadata")
    .update({ is_featured: false })
    .eq("event_id", eventId);

  if (resetError) return { error: resetError };

  const result = await supabase
    .from("gallery_metadata")
    .update({ is_featured: true })
    .eq("event_id", eventId)
    .eq("filename", filename);

  return result;
}

// ✅ SET Cover Image
export async function setCoverImage(eventId, filename) {
  const { error: resetError } = await supabase
    .from("gallery_metadata")
    .update({ is_cover: false })
    .eq("event_id", eventId);

  if (resetError) return { error: resetError };

  const result = await supabase
    .from("gallery_metadata")
    .update({ is_cover: true })
    .eq("event_id", eventId)
    .eq("filename", filename);

  return result;
}

// ✅ SET Profile Image
export async function setProfileImage(eventId, filename) {
  const { error: resetError } = await supabase
    .from("gallery_metadata")
    .update({ is_profile: false })
    .eq("event_id", eventId);

  if (resetError) return { error: resetError };

  const result = await supabase
    .from("gallery_metadata")
    .update({ is_profile: true })
    .eq("event_id", eventId)
    .eq("filename", filename);

  return result;
}
