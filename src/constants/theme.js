// /constants/theme.js

export const THEMES_OBJ = {
  wedding: {
    bg: "bg-pink-50",
    accent: "text-pink-600",
    bgm: "/audio/wedding.mp3",
    effect: "hearts",
    primaryColor: "#EDB5BB",
    bgImage: "/wedding-bg.jpg",         // <<== เพิ่มตรงนี้
  },
  funeral: {
    bg: "bg-gray-900",
    accent: "text-gray-200",
    bgm: "/audio/funeral.mp3",
    effect: "candles",
    primaryColor: "#232323",
    bgImage: "/funeral-bg.png",         // <<== เพิ่มตรงนี้
  },
  anniversary: {
    bg: "bg-yellow-50",
    accent: "text-yellow-600",
    bgm: "/audio/anniversary.mp3",
    effect: "sparkle",
    primaryColor: "#ffe082",
    bgImage: "/anniversary-bg.png",     // <<== เพิ่มตรงนี้
  },
};

export const THEME_DRESSCODE = {
  wedding: [
    { label: "ชมพู", color: "#f8bbd0" },
    { label: "ครีม", color: "#fff9e1" },
    { label: "ฟ้า", color: "#b3e5fc" },
    { label: "ทอง", color: "#ffd700" },
    { label: "เบจ", color: "#e4d3b5" },
  ],
  funeral: [
    { label: "ดำ", color: "#232323" },
    { label: "ขาว", color: "#f5f5f5" },
    { label: "เทา", color: "#bdbdbd" },
    { label: "กรม", color: "#283593" },
    { label: "ม่วง", color: "#7c4dff" },
  ],
  anniversary: [
    { label: "ทอง", color: "#ffe082" },
    { label: "ฟ้า", color: "#81d4fa" },
    { label: "พีช", color: "#ffd1b3" },
    { label: "ม่วง", color: "#ba68c8" },
    { label: "เขียว", color: "#a5d6a7" },
  ],
};
