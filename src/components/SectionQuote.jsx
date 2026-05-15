const COLORS = {
  wedding:     "text-[#9e6b7d]",
  funeral:     "text-[#c9b49a]",
  anniversary: "text-[#9e7e46]",
  family:      "text-[#6b7f9e]",
};

// Accepts children (primary) or text prop for backward compat
export default function SectionQuote({ children, text, theme = "wedding" }) {
  const content = children ?? text;
  if (!content) return null;
  return (
    <p
      className={`text-center italic text-sm md:text-base font-light mb-6 leading-relaxed px-4 ${COLORS[theme] ?? COLORS.wedding}`}
    >
      {content}
    </p>
  );
}
