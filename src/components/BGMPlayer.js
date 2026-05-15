// components/BGMPlayer.js
"use client";
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiMusic, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([^#&?]{11})/);
  return m ? m[1] : null;
}

function getStartSeconds(url) {
  if (!url) return 0;
  // ?t=90 or &t=1m30s
  const tMatch = url.match(/[?&]t=(\d+)/);
  if (tMatch) return parseInt(tMatch[1]);
  return 0;
}

export default function BGMPlayer({ src = "/audio/wedding.mp3", youtubeUrl, isOwner, eventId }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputUrl, setInputUrl] = useState(youtubeUrl || "");
  const [savedUrl, setSavedUrl] = useState(youtubeUrl || "");
  const [saving, setSaving] = useState(false);
  const supabase = createClientComponentClient();

  const ytId = getYouTubeId(savedUrl);
  const startSec = getStartSeconds(savedUrl);
  const useYoutube = !!ytId;

  const handleToggle = () => {
    if (useYoutube) {
      setPlaying(p => !p);
      return;
    }
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(p => !p);
  };

  const handleSave = async () => {
    setSaving(true);
    if (eventId) {
      await supabase.from("events").update({ youtube_link: inputUrl }).eq("id", eventId);
    }
    setSavedUrl(inputUrl);
    setEditing(false);
    setPlaying(false);
    setSaving(false);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col items-end gap-2">

      {/* Edit panel — owner only */}
      {isOwner && editing && (
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-2xl shadow-lg px-3 py-2 border border-rose-100">
          <FiMusic className="text-rose-300 shrink-0" size={14} />
          <input
            className="text-xs outline-none w-52 bg-transparent text-stone-700 placeholder-stone-300"
            placeholder="YouTube URL (เช่น youtu.be/xxxxx?t=90)"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-rose-400 hover:text-rose-600 transition-colors"
            title="บันทึก"
          >
            <FiCheck size={14} />
          </button>
          <button
            onClick={() => { setEditing(false); setInputUrl(savedUrl); }}
            className="text-stone-300 hover:text-stone-500 transition-colors"
            title="ยกเลิก"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* Play button */}
      <div className="flex items-center gap-2 bg-white/70 backdrop-blur rounded-full shadow px-3 py-2">
        {/* Edit icon — owner only */}
        {isOwner && (
          <button
            onClick={() => setEditing(e => !e)}
            className="text-stone-300 hover:text-rose-400 transition-colors mr-1"
            title="ตั้งค่าเพลง YouTube"
          >
            <FiEdit2 size={12} />
          </button>
        )}

        <button
          type="button"
          onClick={handleToggle}
          className="text-xl p-0.5 text-stone-500 hover:text-rose-400 transition-colors"
          title={playing ? "หยุดเพลง" : "เล่นเพลง"}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </button>

        <span className="text-[10px] font-medium text-stone-400 tracking-wide">
          {useYoutube ? "♪ YT" : "BGM"}
        </span>
      </div>

      {/* Hidden YouTube iframe */}
      {useYoutube && playing && (
        <div className="absolute -z-10 opacity-0 pointer-events-none overflow-hidden" style={{ width: 1, height: 1 }}>
          <iframe
            width="1"
            height="1"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&loop=1&playlist=${ytId}&start=${startSec}`}
            title="BGM"
            allow="autoplay"
          />
        </div>
      )}

      {/* Local audio fallback */}
      {!useYoutube && (
        <audio ref={audioRef} src={src} loop />
      )}
    </div>
  );
}
