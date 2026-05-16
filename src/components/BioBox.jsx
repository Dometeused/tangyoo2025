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
  const templates = {
    wedding: {
      invitation: "ขอเรียนเชิญร่วมงานแต่งของ… และ…\nในวันที่…\nณ สถานที่…",
      memory: "ความทรงจำในวันพิเศษของ… และ…\nขอบคุณทุกคนที่มาร่วมเป็นสักขีพยาน",
    },
    funeral: {
      invitation: "งานพิธีของคุณ…\nวันที่…\nสถานที่…",
      memory: "หน้าแห่งความทรงจำ\nคุณ…\nผู้ที่อาลัยรักยิ่ง\nจากครอบครัว…",
    },
    anniversary: {
      invitation: "ขอเชิญร่วมฉลองวันครบรอบของ… และ…\nวันที่…\nณ สถานที่…",
      memory: "ความทรงจำแห่งรัก… ปีที่ผ่านมา\nขอบคุณทุกคนที่อยู่เคียงข้าง",
    },
    baby: {
      invitation: "ขอต้อนรับน้อง…\nเกิดวันที่…\nน้ำหนัก… กิโลกรัม",
      memory: "บันทึกช่วงเวลาพิเศษของน้อง…\nทุกวินาทีคือความทรงจำ",
    },
  };
  return templates[theme]?.[phase] || "";
};

export default function BioBox({ bio, eventId, theme = "funeral", phase = "invitation" }) {
  const supabase = createClientComponentClient();
  const { role } = useAppMode();
  const isOwner = role === "owner" || role === "admin";
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
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
      editor.setEditable(editing && isOwner);
    }
  }, [editing, editor, isOwner]);

  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);
    const html = editor.getHTML();
    const { error } = await supabase
      .from("events")
      .update({ bio: html })
      .eq("id", eventId);

    setSaving(false);
    if (!error) { setEditing(false); setSaveError(""); }
    else setSaveError("บันทึกไม่สำเร็จ กรุณาลองใหม่");
  };

  if (!bio && !editing && !isOwner) {
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
          width: "350px", // Keep fixed size for the frame graphic
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
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[350px] md:max-w-2xl px-4 font-kanit"
        style={{ minHeight: "260px" }}
      >
        {editing && isOwner && <Toolbar editor={editor} />}

        <div style={{ width: "100%", minHeight: "100px" }}>
          {editing && isOwner ? (
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
              onClick={() => isOwner && setEditing(true)}
              className={(isOwner ? "cursor-pointer " : "") + "w-full text-center flex flex-col items-center"}
              style={{
                wordBreak: "break-word",
                fontWeight: 400,
                fontSize: "1.05rem",
                lineHeight: 1.8,
                minHeight: "130px",
              }}
            >
              {bio ? (
                <div dangerouslySetInnerHTML={{ __html: bio }} className="w-full text-center mx-auto" />
              ) : (
                <p className="text-gray-400 italic">ยังไม่มีข้อความความทรงจำ</p>
              )}
            </div>
          )}
        </div>

        {editing && isOwner && (
          <div className="text-right w-full mt-2">
            {saveError && <p className="text-red-500 text-xs mb-2">{saveError}</p>}
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
