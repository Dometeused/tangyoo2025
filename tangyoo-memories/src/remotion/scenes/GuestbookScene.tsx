export function GuestbookScene({ event }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#e0f7ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
      }}
    >
      <div>Guestbook 💌</div>
      {(event.guestbook || []).slice(0, 4).map((g, i) => (
        <div key={i} style={{ margin: 10 }}>
          <div style={{ fontStyle: "italic" }}>"{g.text}"</div>
          <div style={{ textAlign: "right", fontSize: 18, color: "#3faaff" }}>— {g.name}</div>
        </div>
      ))}
    </div>
  );
}
