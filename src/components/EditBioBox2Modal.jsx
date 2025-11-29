import { useState, useEffect } from "react";

export default function EditBioBox2Modal({
  open,
  onClose,
  initialData = {},
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState({
    bridePic: "",
    groomPic: "",
    brideBio: "",
    groomBio: "",
    eventBio: "",
    funFact1: "",
    funFact2: "",
  });

  useEffect(() => {
    if (open) {
      console.log("Modal open: setForm from initialData", initialData);
      setForm({
        bridePic: initialData.bridePic || "",
        groomPic: initialData.groomPic || "",
        brideBio: initialData.brideBio || "",
        groomBio: initialData.groomBio || "",
        eventBio: initialData.eventBio || "",
        funFact1: initialData.funFact1 || "",
        funFact2: initialData.funFact2 || "",
      });
    }
  }, [open, initialData]);

  const handleSave = () => {
    console.log("กดบันทึก", form);
    onSave?.(form);
  };

  if (!open) {
    console.log("Modal return null เพราะ open =", open);
    return null;
  }

  console.log("Modal render อยู่ open =", open);

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <div className="font-bold mb-2">แก้ไขข้อมูลบ่าวสาว</div>
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="URL รูปเจ้าสาว"
          value={form.bridePic}
          onChange={e => setForm(f => ({ ...f, bridePic: e.target.value }))}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="URL รูปเจ้าบ่าว"
          value={form.groomPic}
          onChange={e => setForm(f => ({ ...f, groomPic: e.target.value }))}
        />
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="ข้อความเจ้าสาว (Bride Bio)"
          value={form.brideBio}
          rows={2}
          onChange={e => setForm(f => ({ ...f, brideBio: e.target.value }))}
        />
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="ข้อความเจ้าบ่าว (Groom Bio)"
          value={form.groomBio}
          rows={2}
          onChange={e => setForm(f => ({ ...f, groomBio: e.target.value }))}
        />
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="ข้อความกลาง (Event Bio)"
          value={form.eventBio}
          rows={2}
          onChange={e => setForm(f => ({ ...f, eventBio: e.target.value }))}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Fun Fact 1"
          value={form.funFact1}
          onChange={e => setForm(f => ({ ...f, funFact1: e.target.value }))}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Fun Fact 2"
          value={form.funFact2}
          onChange={e => setForm(f => ({ ...f, funFact2: e.target.value }))}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={onClose}
            disabled={saving}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 rounded bg-pink-500 text-white"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}
