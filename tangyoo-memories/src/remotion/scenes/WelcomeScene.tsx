import { useCurrentFrame, spring, interpolate } from "remotion";

const THEMES = {
  wedding: {
    bg: "#ffe0ec",
    quote: "ขอบคุณที่เป็นส่วนหนึ่งในความทรงจำของเรา",
  },
  funeral: {
    bg: "#ebf0f5",
    quote: "ขอร่วมรำลึกและระลึกถึง",
  },
  family: {
    bg: "#eafbe6",
    quote: "ความทรงจำ... สร้างชีวิตและรอยยิ้ม",
  },
};

export function WelcomeScene({ event }) {
  const frame = useCurrentFrame();
  const fps = 30;

  // Animation
  const quoteOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const nameOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: "clamp" });
  const heartScale = spring({ frame: frame - 18, fps, from: 0.7, to: 1.2, durationInFrames: 14 });

  const t = THEMES[event.theme] || THEMES.wedding;
  const isWedding = event.theme === "wedding";
  const names = isWedding
    ? (
      <span>
        {event.groomName}
        <span style={{
          display: "inline-block",
          margin: "0 14px",
          fontSize: 44,
          color: "#fa3a7d",
          transform: `scale(${heartScale})`,
          filter: "drop-shadow(0 2px 10px #ffd6e7cc)"
        }}>❤️</span>
        {event.brideName}
      </span>
    )
    : (event.groomName || event.brideName);

  // ใช้ cover_url ถ้ามี, ถ้าไม่มี fallback เป็น welcome.png
  const coverUrl = event.cover_url || "/welcome.png";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Prompt, sans-serif",
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      {/* BG image */}
      <img
        src={coverUrl}
        alt="cover"
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.22,
          left: 0,
          top: 0,
          filter: "blur(2.5px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          background: "rgba(255,255,255,0.32)",
        }}
      />

      {/* Quote */}
      <div style={{
        zIndex: 3,
        fontWeight: 700,
        fontSize: 42,
        color: "#b9375e",
        textShadow: "0 2px 12px #fff, 0 1px 5px #fbd",
        opacity: quoteOpacity,
        marginBottom: 16,
        textAlign: "center",
        marginTop: 100,
        lineHeight: 1.25,
      }}>
        {event.introQuote || t.quote}
      </div>

      {/* Name + Emoji */}
      <div style={{
        zIndex: 3,
        fontWeight: 700,
        fontSize: 38,
        color: "#b9375e",
        textShadow: "0 2px 12px #fff, 0 1px 5px #fbd",
        opacity: nameOpacity,
        marginBottom: 12,
        textAlign: "center"
      }}>
        {names}
      </div>

      {/* Date (optional) */}
      {event.eventDate && (
        <div style={{
          zIndex: 3,
          fontSize: 24,
          color: "#7a6e78",
          fontWeight: 400,
          opacity: 0.88,
          textAlign: "center",
          marginBottom: 22
        }}>
          {event.eventDate}
        </div>
      )}
    </div>
  );
}
