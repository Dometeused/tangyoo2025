export default function SectionTitle({ title, theme = "wedding" }) {
  const color =
    theme === "wedding" ? "text-pink-500" :
    theme === "funeral" ? "text-gray-700" :
    theme === "family" ? "text-yellow-600" : "text-indigo-700";
  return (
    <h2 className={`text-2xl md:text-3xl font-extrabold text-center mb-4 ${color} drop-shadow`}>
      {title}
    </h2>
  );
}
