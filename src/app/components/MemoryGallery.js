import React, { useState } from "react";
import MemoryGallery from "../../components/MemoryGallery";

function MemoryGalleryPage() {
  const [images, setImages] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setImages(prev => [...prev, `http://localhost:4000${data.url}`]);
  };

  return (
    <div>
      <h2>อัปโหลดรูปความทรงจำ</h2>
      <input type="file" onChange={handleFileChange} />

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`memory-${idx}`}
            width={180}
            style={{ borderRadius: 8, boxShadow: "0 2px 8px #eee" }}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGalleryPage;
