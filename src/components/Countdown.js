import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function Countdown({ eventDate }) {
  const [diff, setDiff] = useState(getDiff());

  function getDiff() {
    const now = dayjs();
    const target = dayjs(eventDate);
    const duration = target.diff(now);
    if (duration <= 0) return null;
    return {
      days: target.diff(now, "day"),
      hours: target.diff(now, "hour") % 24,
      mins: target.diff(now, "minute") % 60,
      secs: target.diff(now, "second") % 60,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setDiff(getDiff()), 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  if (!diff)
    return (
      <div className="text-pink-200 font-bold text-lg py-2 animate-bounce">
        ถึงเวลางานแล้ว! 🎉
      </div>
    );

  return (
    <div className="text-pink-300 font-bold text-lg py-2 ">
      เหลืออีก <span className="text-2xl">{diff.days}</span> วัน
      <span className="mx-1 text-lg">•</span>
      <span className="text-xl">{diff.hours}</span> ชม.
      <span className="mx-1 text-lg">•</span>
      <span className="text-xl">{diff.mins}</span> นาที
      <span className="mx-1 text-lg">•</span>
      <span className="text-lg">{diff.secs}</span> วิ
    </div>
  );
}
