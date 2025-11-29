function toEmbedUrl(url) {
  // Support both youtube.com/watch?v=xxx และ youtu.be/xxx
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return url;
}

export default function VideoEmbedCard({ src, title = "Video", link }) {
  return (
    <div className="relative w-full max-w-xs mx-auto rounded-xl shadow-lg overflow-hidden bg-white/80 my-4">
      <iframe
        src={toEmbedUrl(src)}
        width="100%"
        height="180"
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full"
      />
      {link && (
        <button
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full px-2 py-1 text-xs shadow"
          onClick={() => window.open(link, "_blank")}
          title="ดูเต็มหน้าจอ"
        >🔗</button>
      )}
    </div>
  );
}