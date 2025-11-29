"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppMode } from "@/context/AppModeContext";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { FontSize } from "@/extensions/FontSize";
import { FontFamily } from "@/extensions/FontFamily";
import Toolbar from "@/components/Toolbar";

const getDefaultTemplate = (theme, phase) => {
  if (theme === "funeral" && phase === "invitation") {
    return "งานศพของคุณ…\nวันที่…\nสถานที่…";
  }
  if (theme === "funeral" && phase === "memory") {
    return "หน้าแห่งความทรงจำ\nคุณ…\nผู้ที่อาลัยรักยิ่ง\nจากครอบครัว…";
  }
  if (theme === "wedding" && phase === "invitation") {
    return "ขอเรียนเชิญร่วมงานแต่งของ… และ…\nในวันที่…\nณ สถานที่…";
  }
  if (theme === "wedding" && phase === "memory") {
    return "ความทรงจำในวันพิเศษของ… และ…\nขอบคุณทุกคนที่มาร่วมเป็นสักขีพยาน";
  }
  return "";
};

export default function BioBox({ bio, eventId, theme = "funeral", phase = "invitation" }) {
  const supabase = createClientComponentClient();
  const { role } = useAppMode();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const defaultTemplate = getDefaultTemplate(theme, phase);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      FontSize,
      FontFamily,
    ],
    content: bio || defaultTemplate,
    editable: false,
  });

  useEffect(() => {
    if (editor && !editing) {
      if (bio && editor.getHTML() !== bio) {
        editor.commands.setContent(bio);
      }
      if (!bio && editor.getHTML() !== defaultTemplate) {
        editor.commands.setContent(defaultTemplate);
      }
    }
  }, [bio, editor, editing, defaultTemplate]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editing && role === "owner");
    }
  }, [editing, editor, role]);

  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);
    const html = editor.getHTML();
    const { error } = await supabase
      .from("events")
      .update({ bio: html })
      .eq("id", eventId);

    setSaving(false);
    if (!error) setEditing(false);
    else alert("บันทึกไม่สำเร็จ");
  };

  if (!bio && !editing && role !== "owner") {
    return (
      <section className="w-full flex flex-col items-center text-center mb-8">
        <div className="text-gray-400 italic text-base">ยังไม่มีข้อความความทรงจำ</div>
      </section>
    );
  }

  return (
    <section className="relative w-full flex justify-center items-center py-10 mb-8 min-h-[350px]">
      <img
        src="/flowers/Beige Simple Floral Reminder Quotes Instagram Post.svg"
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "350px",
          height: "350px",
          opacity: 0.62,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
        draggable="false"
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ width: "350px", minHeight: "260px", padding: "0 10px" }}
      >
        {editing && role === "owner" && <Toolbar editor={editor} />}

        <div style={{ width: "100%", minHeight: "100px" }}>
          {editing && role === "owner" ? (
            <EditorContent
              editor={editor}
              className="text-lg"
              style={{
                textAlign: "center",
                textShadow: "0 1px 6px #e2e2e2, 0 0px 1px #bbb",
              }}
            />
          ) : (
            <div
              onClick={() => role === "owner" && setEditing(true)}
              className={(role === "owner" ? "cursor-pointer " : "") + "w-full text-center"}
              style={{
                wordBreak: "break-word",
                textShadow: "0 1px 8px #eee, 0 0px 2px #bbb",
                fontWeight: 400,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                minHeight: "130px",
              }}
            >
              {bio ? (
                <div dangerouslySetInnerHTML={{ __html: bio }} />
              ) : (
                <p className="text-gray-400 italic">ยังไม่มีข้อความความทรงจำ</p>
              )}
            </div>
          )}
        </div>

        {editing && role === "owner" && (
          <div className="text-right w-full mt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-opacity-80"
              disabled={saving}
            >
              {saving ? "กำลังบันทึก..." : "บันทึกข้อความ"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
              disabled={saving}
              type="button"
            >
              ยกเลิก
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
