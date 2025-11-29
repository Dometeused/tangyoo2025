import { useCurrentFrame, interpolate, spring } from "remotion";

export function GalleryScene({ event }) {
  const frame = useCurrentFrame();
  const fps = 30;
  const images = event.featureImages || [];

  // ละมุนขึ้น: โชว์รูปละ 90 เฟรม = 3 วิ
  const FRAMES_PER_IMG = 90;

  // Index ของรูปปัจจุบัน
  const currentIndex = Math.min(Math.floor(frame / FRAMES_PER_IMG), images.length - 1);
  const currImg = images[currentIndex];

  // Animation นุ่มนวลขึ้น
  const localFrame = frame % FRAMES_PER_IMG;
  const imgOpacity = interpolate(localFrame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const imgScale = spring({ frame: localFrame, fps, from: 0.96, to: 1, durationInFrames: 30 });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fffbe0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "Prompt, sans-serif"
      }}
    >
      {currImg && (
        <div style={{ textAlign: "center" }}>
          <img
            src={currImg.image}
            alt={`feature-${currentIndex}`}
            style={{
              width: 340,
              maxHeight: 440,
              borderRadius: 32,
              boxShadow: "0 12px 40px #ffc16b30",
              opacity: imgOpacity,
              transform: `scale(${imgScale})`,
              transition: "all 0.5s",
            }}
          />
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#a78530",
              fontWeight: 600,
              textShadow: "0 2px 10px #fff9",
              opacity: imgOpacity,
            }}
          >
            {currImg.caption}
          </div>
        </div>
      )}
    </div>
  );
}
