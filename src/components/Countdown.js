"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function calcDiff(eventDate) {
  const now = dayjs();
  const target = dayjs(eventDate);
  if (target.diff(now) <= 0) return null;
  return {
    days:  target.diff(now, "day"),
    hours: target.diff(now, "hour") % 24,
    mins:  target.diff(now, "minute") % 60,
    secs:  target.diff(now, "second") % 60,
  };
}

const UNITS = ["วัน", "ชม.", "นาที", "วิ"];

export default function Countdown({ eventDate }) {
  const [diff, setDiff] = useState(() => calcDiff(eventDate));

  useEffect(() => {
    const timer = setInterval(() => setDiff(calcDiff(eventDate)), 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  if (!diff)
    return (
      <p className="text-sm font-medium text-rose-400 tracking-wide py-2">
        ถึงเวลางานแล้ว! 🎉
      </p>
    );

  const values = [diff.days, diff.hours, diff.mins, diff.secs];

  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase font-medium">เหลืออีก</p>
      <div className="flex items-end gap-2">
        {values.map((val, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex flex-col items-center">
              <span
                className="text-2xl font-light tabular-nums leading-none"
                style={{ color: "#6b2d4a", minWidth: "2ch", textAlign: "center" }}
              >
                {String(val).padStart(2, "0")}
              </span>
              <span className="text-[9px] tracking-wider text-stone-400 mt-0.5">
                {UNITS[i]}
              </span>
            </div>
            {i < 3 && (
              <span className="text-stone-300 text-base mb-3 select-none">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
