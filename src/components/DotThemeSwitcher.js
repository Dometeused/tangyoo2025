"use client";
import { useAppMode } from "@/context/AppModeContext";
import { THEMES_OBJ as THEMES } from "../constants/theme";
// or adjust the path as needed based on your project structure

export default function DotThemeSwitcher() {
  const { theme, setTheme } = useAppMode();

  return (
    <div className="flex gap-2">
      {Object.keys(THEMES).map((key) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`w-6 h-6 rounded-full border-2 ${
            theme === key ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: THEMES[key].dot }}
        />
      ))}
    </div>
  );
}
