export function TimelineScene({ event }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ececff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
      }}
    >
      <div>Timeline 📅</div>
      {(event.timeline || []).slice(0, 2).map((item, i) => (
        <div key={i} style={{ margin: 10 }}>
          <div style={{ fontWeight: "bold" }}>{item.date}</div>
          <div>{item.caption}</div>
        </div>
      ))}
    </div>
  );
}
