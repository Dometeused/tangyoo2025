const ACCENTS = {
  wedding:     "#ddb0c0",
  funeral:     "#c9a882",
  anniversary: "#c9a050",
  family:      "#8aacc8",
};

export default function StoryDivider({ theme = "wedding" }) {
  const accent = ACCENTS[theme] ?? ACCENTS.wedding;
  return (
    <div className="flex items-center gap-4 my-8 px-6 md:px-12">
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accent})` }}
      />
      <span style={{ color: accent, fontSize: "9px", letterSpacing: "0.3em", opacity: 0.75 }}>
        ✦✦✦
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${accent})` }}
      />
    </div>
  );
}
