"use client";

import { useAppMode } from "@/context/AppModeContext";

const ROLES = [
  { key: "owner", label: "เจ้าภาพ 👤" },
  { key: "guest", label: "แขก 🙋‍♂️" },
];

export default function RoleSwitcher() {
  const { role, setRole } = useAppMode();

  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="text-sm font-medium text-white drop-shadow">ดูในมุมของ:</div>
      <div className="flex gap-2">
        {ROLES.map((r) => (
          <button
            key={r.key}
            onClick={() => setRole(r.key)}
            className={`px-3 py-1 rounded-full text-sm font-medium shadow
              ${
                role === r.key
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }
              transition-all duration-150`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
