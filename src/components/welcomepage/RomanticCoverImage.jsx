'use client';
export default function RomanticCoverImage({
  coverUrl = "/cover-mock.jpg",
  alt = "cover",
  style = {},
  className = "",
}) {
  if (!coverUrl) return null;
  return (
    <div
      className={className}
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        left: 0,
        bottom: 18,
        zIndex: 4,
        pointerEvents: "none",
        ...style,
      }}
    >
      <img
        src={coverUrl}
        alt={alt}
        style={{
          borderRadius: 22,
          boxShadow: "0 4px 24px #0002, 0 2px 12px #f8c3",
          maxWidth: "320px",
          width: "88vw",
          maxHeight: "128px",
          objectFit: "cover",
          border: "3px solid #fff",
          ...style.img,
        }}
      />
    </div>
  );
}
