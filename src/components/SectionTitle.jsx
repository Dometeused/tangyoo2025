const STYLES = {
  wedding:     { text: "#6b2d4a", accent: "#ddb0c0" },
  funeral:     { text: "#f0e8df", accent: "#c9a882" },
  anniversary: { text: "#6b4a1e", accent: "#c9a050" },
  baby:        { text: "#5b21b6", accent: "#c4b5fd" },
};

export default function SectionTitle({ title, theme = "wedding" }) {
  const { text, accent } = STYLES[theme] ?? STYLES.wedding;
  return (
    <div className="flex flex-col items-center gap-2 mb-3">
      {/* Ornamental rule */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-px" style={{ background: accent }} />
        <span style={{ color: accent, fontSize: "7px", letterSpacing: "0.25em" }}>✦</span>
        <div className="flex-1 h-px" style={{ background: accent }} />
      </div>
      {/* Title */}
      <h2
        className="text-lg md:text-xl font-medium text-center tracking-wide leading-snug"
        style={{ color: text }}
      >
        {title}
      </h2>
    </div>
  );
}
