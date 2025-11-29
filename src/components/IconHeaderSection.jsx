"use client";

export default function IconHeaderSection({ icon = "⭐", title, small = false }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${small ? "mt-2" : "mt-8"}`}>
      <div className="text-2xl md:text-3xl">{icon}</div>
      <h2
        className={`font-bold ${
          small ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
        } text-white tracking-tight`}
      >
        {title}
      </h2>
    </div>
  );
}
