import { useCurrentFrame, spring, interpolate } from "remotion";

export function BioScene({ event }) {
  const frame = useCurrentFrame();
  const fps = 30;

  // Timing ของแต่ละ block
  const groomStart = 0;
  const brideStart = 60;
  const coupleStart = 120;

  // Effect
  const groomOpacity = interpolate(frame, [groomStart, groomStart + 18], [0, 1], { extrapolateRight: "clamp" });
  const groomScale = spring({ frame: frame - groomStart, fps, from: 0.92, to: 1, durationInFrames: 30 });

  const brideOpacity = interpolate(frame, [brideStart, brideStart + 18], [0, 1], { extrapolateRight: "clamp" });
  const brideScale = spring({ frame: frame - brideStart, fps, from: 0.92, to: 1, durationInFrames: 30 });

  const coupleOpacity = interpolate(frame, [coupleStart, coupleStart + 16], [0, 1], { extrapolateRight: "clamp" });
  const coupleScale = spring({ frame: frame - coupleStart, fps, from: 0.94, to: 1, durationInFrames: 24 });

  // ฟังก์ชันแสดง Block เดี่ยว (groom/bride)
  const SingleBlock = ({ pic, name, bio, opacity, scale }) => (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // center กลางจอ
        width: "100%",
        transition: "opacity 1s, transform 1s",
        position: "absolute", // แต่จะไม่ลอยบนสุด ถ้า flex อยู่ใน parent ที่ position:relative
        top: 0, left: 0
      }}
    >
      <img
        src={pic}
        alt={name}
        style={{
          width: 150, height: 150,
          borderRadius: 32,
          objectFit: "cover",
          boxShadow: "0 8px 32px #e9baca44",
          margin: "0 auto 18px",
        }}
      />
      <div style={{ fontWeight: 700, fontSize: 34, textAlign: "center" }}>{name}</div>
      <div style={{
        fontSize: 22,
        color: "#7a6e78",
        textAlign: "center",
        marginTop: 8,
        opacity: 0.8
      }}>
        {bio}
      </div>
    </div>
  );

  // Block คู่
  const CoupleBlock = ({ groomPic, bridePic, names, opacity, scale, bioCombined }) => (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        position: "absolute",
        top: 0, left: 0,
        transition: "opacity 1s, transform 1s"
      }}
    >
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 10 }}>
        <img
          src={groomPic}
          alt={names[0]}
          style={{
            width: 92, height: 92,
            borderRadius: 24,
            objectFit: "cover",
            border: "2.5px solid #ffcee6",
            boxShadow: "0 2px 8px #eee",
            background: "#fff",
          }}
        />
        <img
          src={bridePic}
          alt={names[1]}
          style={{
            width: 92, height: 92,
            borderRadius: 24,
            objectFit: "cover",
            border: "2.5px solid #ffd6ee",
            boxShadow: "0 2px 8px #eee",
            background: "#fff",
          }}
        />
      </div>
      <div style={{
        fontWeight: 700,
        fontSize: 28,
        color: "#ad7e94",
        textShadow: "0 2px 8px #fff",
        marginTop: 8,
        textAlign: "center"
      }}>
        {bioCombined || `${names[0]} & ${names[1]} — รักแรกพบ`}
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(120deg, #fffbe9 0%, #ffe0ec 100%)",
        fontFamily: "Prompt, sans-serif",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Groom */}
      {(frame < brideStart + 18) && (
        <SingleBlock
          pic={event.groomPic}
          name={event.groomName}
          bio={event.groomBio}
          opacity={groomOpacity * (frame < brideStart ? 1 : interpolate(frame, [brideStart, brideStart + 18], [1, 0]))}
          scale={groomScale}
        />
      )}
      {/* Bride */}
      {(frame >= brideStart) && (frame < coupleStart + 16) && (
        <SingleBlock
          pic={event.bridePic}
          name={event.brideName}
          bio={event.brideBio}
          opacity={brideOpacity * (frame < coupleStart ? 1 : interpolate(frame, [coupleStart, coupleStart + 16], [1, 0]))}
          scale={brideScale}
        />
      )}
      {/* Couple */}
      {(frame >= coupleStart) && (
        <CoupleBlock
          groomPic={event.groomPic}
          bridePic={event.bridePic}
          names={[event.groomName, event.brideName]}
          bioCombined={event.bioCombined}
          opacity={coupleOpacity}
          scale={coupleScale}
        />
      )}
    </div>
  );
}
