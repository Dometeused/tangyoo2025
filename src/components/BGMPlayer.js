// components/BGMPlayer.js
"use client";
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function BGMPlayer({ src = "/audio/wedding.mp3" }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed top-5 right-5 z-50 bg-white/70 rounded-full shadow p-2 flex items-center">
      <audio ref={audioRef} src={src} loop />
      <button
        type="button"
        onClick={handleToggle}
        className="text-2xl p-1"
        title={playing ? "Pause Music" : "Play Music"}
      >
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <span className="ml-2 text-xs font-semibold">BGM</span>
    </div>
  );
}
