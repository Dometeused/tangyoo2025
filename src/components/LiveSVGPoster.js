"use client";
import { useEffect, useRef, useState } from "react";

export default function LiveSVGPoster({ svgUrl, form, imageUrl, style }) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  // -- state offset สำหรับ drag/เลื่อนภาพ
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // Mouse drag logic
  function onMouseDown(e) {
    setDrag(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
  function onMouseMove(e) {
    if (!drag) return;
    setOffset({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  }
  function onMouseUp() {
    setDrag(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  // Live update text ใน SVG
  useEffect(() => {
    if (!svgRef.current) return;
    const svgDoc = svgRef.current.contentDocument || svgRef.current.getSVGDocument?.();
    if (!svgDoc) return;
    [
      ["groom", "Groom"],
      ["bride", "Bride"],
      ["date", "Date"],
      ["place", "Place"],
    ].forEach(([stateKey, svgId]) => {
      let el = svgDoc.getElementById(svgId) || svgDoc.getElementById(stateKey);
      if (el) {
        if (el.tagName === "text" && el.firstElementChild?.tagName === "tspan") {
          el.firstElementChild.textContent = form[stateKey] || "";
        } else {
          el.textContent = form[stateKey] || "";
        }
      }
    });
  }, [form, svgUrl]);

  // Download PNG (object-cover + offset)
  async function handleDownload() {
    const svgElem = svgRef.current?.contentDocument?.documentElement;
    if (!svgElem) return alert("SVG ยังโหลดไม่เสร็จ");
    const svgString = new XMLSerializer().serializeToString(svgElem);
    const svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));

    const canvasWidth = 1080;
    const canvasHeight = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = canvasHeight;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // 1. BG object-cover + offset
    let bgLoaded = Promise.resolve();
    if (imageUrl) {
      bgLoaded = new Promise(resolve => {
        const bgImg = new window.Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.onload = () => {
          const { width: iw, height: ih } = bgImg;
          const wr = canvasWidth / iw;
          const hr = canvasHeight / ih;
          const scale = Math.max(wr, hr);
          const dw = iw * scale;
          const dh = ih * scale;
          // apply offset (user drag)
          const dx = (canvasWidth - dw) / 2 + offset.x * (canvasWidth / 360);
          const dy = (canvasHeight - dh) / 2 + offset.y * (canvasHeight / 360);
          ctx.drawImage(bgImg, dx, dy, dw, dh);
          resolve();
        };
        bgImg.src = imageUrl;
      });
    }
    await bgLoaded;

    // 2. SVG overlay
    await new Promise(resolve => {
      const svgImg = new window.Image();
      svgImg.crossOrigin = "anonymous";
      svgImg.onload = () => {
        ctx.drawImage(svgImg, 0, 0, canvasWidth, canvasHeight);
        resolve();
      };
      svgImg.src = svgBase64;
    });

    // 3. Download
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "TangYoo-Poster.png";
    a.click();
  }

  // แชร์ลิงก์ Facebook/Line (ไม่แชร์ไฟล์)
  function handleShareFB() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  }
  function handleShareLine() {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  }

  // UI
  return (
    <div className="flex flex-col items-center">
      <div
        ref={wrapperRef}
        className="relative w-[360px] h-[360px] rounded-2xl overflow-hidden border shadow bg-white flex items-center justify-center"
        style={style}
      >
        {/* Dragable BG image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="User"
            className="absolute inset-0 w-full h-full object-cover z-10 cursor-move pointer-events-auto select-none"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: drag ? "none" : "transform 0.15s"
            }}
            draggable={false}
            onMouseDown={onMouseDown}
          />
        )}
        {/* SVG overlay */}
        <object
          data={svgUrl}
          type="image/svg+xml"
          className="w-full h-full relative z-20 pointer-events-none"
          ref={svgRef}
          aria-label="Live SVG Poster"
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-lg bg-[#ececec] text-[#444] shadow"
        >
          ดาวน์โหลด PNG
        </button>
        <button
          onClick={handleShareFB}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow"
        >
          แชร์ Facebook
        </button>
        <button
          onClick={handleShareLine}
          className="px-4 py-2 rounded-lg bg-green-500 text-white shadow"
        >
          แชร์ LINE
        </button>
      </div>
      <div className="text-xs text-gray-400 mt-1">*ลากภาพเพื่อจัดตำแหน่ง</div>
    </div>
  );
}
