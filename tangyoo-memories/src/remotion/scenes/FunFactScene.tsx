import { useCurrentFrame, spring, interpolate } from "remotion";

export function FunFactScene({ event }) {
  const frame = useCurrentFrame();
  const fps = 30;

  // ข้อแรกขึ้นต้นที่ frame 12
  const fact1Appear = interpolate(frame, [12, 20], [0, 1], { extrapolateRight: "clamp" });
  const fact1Scale = spring({ frame: frame - 12, fps, from: 0.85, to: 1, durationInFrames: 16 });

  // ข้อสองขึ้นหลังจากข้อแรก 20 เฟรม
  const fact2Appear = interpolate(frame, [36, 44], [0, 1], { extrapolateRight: "clamp" });
  const fact2Scale = spring({ frame: frame - 36, fps, from: 0.85, to: 1, durationInFrames: 16 });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#eafbe6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontFamily: "Prompt, sans-serif"
      }}
    >
      <div style={{
        fontWeight: 700,
        fontSize: 38,
        color: "#33ab6a",
        marginBottom: 28,
        letterSpacing: 1.5,
      }}>
        Fun Fact 💡
      </div>
      <div
        style={{
          opacity: fact1Appear,
          transform: `scale(${fact1Scale})`,
          transition: "all 0.4s",
          margin: 10,
          color: "#398e52",
          fontWeight: 600,
          textShadow: "0 2px 8px #fff9",
        }}
      >
        {event.funFact1 || "ยังไม่มี funfact"}
      </div>
      <div
        style={{
          opacity: fact2Appear,
          transform: `scale(${fact2Scale})`,
          transition: "all 0.4s",
          margin: 10,
          color: "#398e52",
          fontWeight: 600,
          textShadow: "0 2px 8px #fff9",
        }}
      >
        {event.funFact2}
      </div>
    </div>
  );
}
