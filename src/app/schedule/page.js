'use client';
import { useState, useRef } from "react";
import { toPng } from "html-to-image";

// ----- Theme Config -----
const THEMES = {
  funeral: {
    label: "งานศพ",
    bgImage: "/bg-funeral-default.jpg",
    bgColor: "#47484a",
    text: "#e0e0e0",
    accent: "#ffd700",
  },
  wedding: {
    label: "งานแต่ง",
    bgImage: "/bg-wedding-default.jpg",
    bgColor: "#fdf6f0",
    text: "#b91c1c",
    accent: "#f472b6",
  },
  other: {
    label: "อื่นๆ",
    bgImage: "",
    bgColor: "#f3f4f6",
    text: "#374151",
    accent: "#f59e42",
  },
};

// ----- Card Preview -----
function ScheduleCard({ schedules, title, config }) {
  return (
    <div
      id="schedule-card"
      className="relative rounded-2xl p-5 max-w-md w-[340px] mx-auto shadow-lg overflow-hidden border font-jeamjit"
      style={{
        backgroundColor: config.bgColor,
        backgroundImage: config.bgImage ? `url('${config.bgImage}')` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: config.text
      }}
    >
      {/* BG Overlay ให้อ่านง่าย */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-xl font-bold text-center mb-1" style={{ color: "#ffd700" }}>
          {title}
        </h1>
        <hr className="my-2 border-t-2" style={{ borderColor: "#ffd700", opacity: 0.7, width: "60%", margin: "0 auto" }} />
        <div className="flex flex-col gap-2 font-medium text-[15px]">
          {schedules.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span>{item.date}</span>
              {(item.activity || item.time) &&
                <span>
                  {item.activity && <span>พิธี{item.activity}</span>}
                  {item.time && <span> เวลา {item.time} น.</span>}
                </span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----- Main Component -----
export default function FuneralScheduleGen() {
  const [theme, setTheme] = useState("funeral");
  const config = THEMES[theme];

  const [title, setTitle] = useState("กำหนดการงานศพ");
  const [schedules, setSchedules] = useState([
    { date: "", activity: "", time: "" }
  ]);
  const cardRef = useRef(null);

  function addSchedule() {
    setSchedules([...schedules, { date: "", activity: "", time: "" }]);
  }
  function updateSchedule(idx, field, value) {
    setSchedules(schedules.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    ));
  }
  async function handleSave() {
    const node = cardRef.current;
    if (!node) return;

    toPng(node, {
      cacheBust: true,
      backgroundColor: null,
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "schedule-funeral.png";
      link.href = dataUrl;
      link.click();
    }).catch((error) => {
      alert("เกิดข้อผิดพลาดในการบันทึกภาพ: " + error.message);
    });
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-gray-800">สร้างการ์ดกำหนดการ</h2>

      {/* Theme Selector */}
      <div className="mb-4 flex gap-2">
        {Object.keys(THEMES).map(t => (
          <button
            key={t}
            className={`px-3 py-1 rounded font-bold border ${theme === t ? "border-yellow-500" : "border-gray-200"} bg-white`}
            onClick={() => setTheme(t)}
          >
            {THEMES[t].label}
          </button>
        ))}
      </div>

      {/* ฟอร์ม */}
      <div className="bg-white p-6 rounded-xl shadow-md min-w-[320px] mb-5">
        <label className="font-bold">หัวข้อ</label>
        <input
          className="w-full p-2 rounded mb-3 border font-sans"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="mb-3">
          {schedules.map((item, idx) => (
            <div key={idx} className="mb-2 flex gap-2">
              <input
                className="p-2 rounded flex-1 border font-sans"
                placeholder="วัน/วันที่"
                value={item.date}
                onChange={e => updateSchedule(idx, "date", e.target.value)}
              />
              <input
                className="p-2 rounded flex-1 border font-sans"
                placeholder="พิธี (เช่น รดน้ำศพ)"
                value={item.activity}
                onChange={e => updateSchedule(idx, "activity", e.target.value)}
              />
              <input
                className="p-2 rounded w-20 border font-sans"
                placeholder="เวลา"
                value={item.time}
                onChange={e => updateSchedule(idx, "time", e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={addSchedule}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-gray-700 font-semibold text-sm"
          >
            + เพิ่มรายการ
          </button>
        </div>
      </div>
      {/* Preview Card */}
      <div className="flex flex-col items-center gap-4">
        <div ref={cardRef}>
          <ScheduleCard schedules={schedules} title={title} config={config} />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 font-bold"
        >
          บันทึก/ดาวน์โหลดเป็นภาพ
        </button>
      </div>
    </div>
  );
}
