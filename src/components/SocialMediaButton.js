import { FiFacebook, FiInstagram, FiPhone, FiMessageCircle } from "react-icons/fi";

export default function SocialMediaButton({ line, facebook, instagram, phone, isOwner, onEdit }) {
  // DEBUG: log props ทุกครั้งที่ render
  console.log("[SocialMediaButton] props =", { line, facebook, instagram, phone, isOwner, onEdit });

  const socials = [
    {
      key: "line",
      url: line ? (line.startsWith("http") ? line : `https://line.me/ti/p/${line}`) : "",
      icon: <FiMessageCircle />,
      label: "LINE",
    },
    {
      key: "facebook",
      url: facebook,
      icon: <FiFacebook />,
      label: "Facebook",
    },
    {
      key: "instagram",
      url: instagram
        ? instagram.startsWith("http")
          ? instagram
          : `https://instagram.com/${instagram.replace(/^@/, "")}`
        : "",
      icon: <FiInstagram />,
      label: "Instagram",
    },
    {
      key: "phone",
      url: phone ? `tel:${phone}` : "",
      icon: <FiPhone />,
      label: "โทร",
    },
  ];

  return (
    <div className="flex gap-3 mt-1">
      {socials.map(
        (soc) =>
          soc.url && (
            <a
              href={soc.url}
              target={soc.key === "phone" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              key={soc.key}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xl text-gray-700 hover:bg-theme/10 hover:text-theme transition"
              title={soc.label}
            >
              {soc.icon}
            </a>
          )
      )}

      {/* ปุ่มแก้ไขของ Owner */}
      {isOwner &&
        socials.map((soc) => (
          <button
            key={soc.key + "-edit"}
            onClick={() => onEdit?.(soc.key, soc.url)}
            className="ml-1 text-xs underline text-theme"
            type="button"
          >
            {soc.url ? `แก้ไข${soc.label}` : `เพิ่ม${soc.label}`}
          </button>
        ))}
    </div>
  );
}
