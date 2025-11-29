import { useState } from "react";
import ProfileImagePickerModal from "@/components/ProfileImagePickerModal";
import { useAppMode } from "@/context/AppModeContext";

export default function BioBox2EditModal({
  open,
  onClose,
  initialData,
  onSave,
  saving,
  eventId
}) {
  const { theme } = useAppMode();
  const [form, setForm] = useState(initialData);

  // Picker modals
  const [showBridePicPicker, setShowBridePicPicker] = useState(false);
  const [showGroomPicPicker, setShowGroomPicPicker] = useState(false);
  const [showProfilePicker, setShowProfilePicker] = useState(false);

  // ช่องกรอกของแต่ละธีม
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xl text-gray-400 hover:text-black"
            >×</button>
            <div className="font-bold mb-3">แก้ไขโปสเตอร์</div>

            {/* Wedding: bridePic, groomPic */}
            {theme === "wedding" && (
              <>
                <div className="mb-3">
                  <div className="mb-1 text-xs text-gray-500">รูปเจ้าสาว</div>
                  <div className="flex gap-2 items-center">
                    <img
                      src={form.bridePic || "/profile-placeholder.png"}
                      className="w-16 h-24 object-cover rounded border"
                      alt=""
                    />
                    <button
                      className="px-3 py-1 bg-pink-100 rounded text-pink-700 text-xs"
                      onClick={() => setShowBridePicPicker(true)}
                      type="button"
                    >เลือกรูป</button>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-1 text-xs text-gray-500">รูปเจ้าบ่าว</div>
                  <div className="flex gap-2 items-center">
                    <img
                      src={form.groomPic || "/profile-placeholder.png"}
                      className="w-16 h-24 object-cover rounded border"
                      alt=""
                    />
                    <button
                      className="px-3 py-1 bg-pink-100 rounded text-pink-700 text-xs"
                      onClick={() => setShowGroomPicPicker(true)}
                      type="button"
                    >เลือกรูป</button>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="ข้อความเจ้าสาว (Bride Bio)"
                    value={form.brideBio || ""}
                    onChange={e => setForm(f => ({ ...f, brideBio: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="ข้อความเจ้าบ่าว (Groom Bio)"
                    value={form.groomBio || ""}
                    onChange={e => setForm(f => ({ ...f, groomBio: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="ข้อความกลาง (Event Bio)"
                    value={form.eventBio || ""}
                    onChange={e => setForm(f => ({ ...f, eventBio: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="Fun Fact 1"
                    value={form.funFact1 || ""}
                    onChange={e => setForm(f => ({ ...f, funFact1: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="Fun Fact 2"
                    value={form.funFact2 || ""}
                    onChange={e => setForm(f => ({ ...f, funFact2: e.target.value }))}
                  />
                </div>
              </>
            )}

            {/* Funeral: profile, poster_name, word, living */}
            {theme === "funeral" && (
              <>
                <div className="mb-3">
                  <div className="mb-1 text-xs text-gray-500">รูปโปรไฟล์</div>
                  <div className="flex gap-2 items-center">
                    <img
                      src={form.profile || "/profile-placeholder.png"}
                      className="w-16 h-24 object-cover rounded border"
                      alt=""
                    />
                    <button
                      className="px-3 py-1 bg-pink-100 rounded text-pink-700 text-xs"
                      onClick={() => setShowProfilePicker(true)}
                      type="button"
                    >เลือกรูป</button>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="ชื่อ-สกุล (poster_name)"
                    value={form.poster_name || ""}
                    onChange={e => setForm(f => ({ ...f, poster_name: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="วรรคทอง/ข้อความพิเศษ (word)"
                    value={form.word || ""}
                    onChange={e => setForm(f => ({ ...f, word: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="input w-full"
                    placeholder="ช่วงปีเกิด-ถึงปีเสียชีวิต (living)"
                    value={form.living || ""}
                    onChange={e => setForm(f => ({ ...f, living: e.target.value }))}
                  />
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => onSave(form)}
                className="bg-pink-500 text-white px-6 py-2 rounded shadow"
                disabled={saving}
              >{saving ? "บันทึก..." : "บันทึก"}</button>
              <button
                onClick={onClose}
                className="bg-gray-200 px-4 py-2 rounded"
                disabled={saving}
              >ยกเลิก</button>
            </div>
          </div>
        </div>
      )}

      {/* Picker Modals */}
      <ProfileImagePickerModal
        open={showBridePicPicker}
        onClose={() => setShowBridePicPicker(false)}
        eventId={eventId}
        onSelect={url => setForm(f => ({ ...f, bridePic: url }))}
        label="เลือกรูปเจ้าสาว"
      />
      <ProfileImagePickerModal
        open={showGroomPicPicker}
        onClose={() => setShowGroomPicPicker(false)}
        eventId={eventId}
        onSelect={url => setForm(f => ({ ...f, groomPic: url }))}
        label="เลือกรูปเจ้าบ่าว"
      />
      <ProfileImagePickerModal
        open={showProfilePicker}
        onClose={() => setShowProfilePicker(false)}
        eventId={eventId}
        onSelect={url => setForm(f => ({ ...f, profile: url }))}
        label="เลือกรูปโปรไฟล์"
      />
    </>
  );
}
