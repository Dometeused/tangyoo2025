import Image from "next/image";

export default function Gallery({ gallery, onEdit, onDelete, onSetFeatured }) {
  return (
    <div>
      {gallery.map((item, index) => (
        <div key={index} className="mb-4">
          <Image
            src={item.src}
            alt={`image-${index}`}
            width={600}
            height={400}
            className="rounded"
          />

          {onEdit && (
            <input
              type="text"
              value={item.caption}
              onChange={(e) => onEdit(index, e.target.value)}
              placeholder="เพิ่มคำอธิบาย"
              className="mt-2 p-1 border rounded w-full text-sm"
            />
          )}

          <div className="flex gap-2 mt-2">
            {onDelete && (
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 text-xs underline"
              >
                ลบภาพ
              </button>
            )}

            {onSetFeatured && (
              <button
                onClick={() => onSetFeatured(index)}
                className="text-blue-500 text-xs underline"
              >
                ตั้งเป็นภาพเด่น
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
