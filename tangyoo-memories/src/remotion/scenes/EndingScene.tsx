export function EndingScene({ event }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ffe0ec",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 34,
      }}
    >
      <div>ขอบคุณที่เป็นส่วนหนึ่งในความทรงจำของเรา</div>
      <img
        src={event.cover_url}
        alt="ending"
        style={{ width: 220, borderRadius: 22, margin: 24 }}
      />
      <div style={{ fontSize: 22, color: "#f06" }}>TangYoo Memories</div>
    </div>
  );
}
