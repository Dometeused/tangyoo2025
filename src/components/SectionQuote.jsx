export default function SectionQuote({ text, theme = "wedding" }) {
  return (
    <div className="flex justify-center mb-4">
      <span className={`italic text-base md:text-lg px-4 py-2 rounded-xl bg-pink-50/80 border-l-4 border-pink-200 text-pink-500`}>
        {text}
      </span>
    </div>
  );
}
