/**
 * Compress an image file using the browser Canvas API.
 * @param {File} file  - Original image file
 * @param {object} opts
 *   maxWidth  {number}  - Max width in px  (default 1920)
 *   maxHeight {number}  - Max height in px (default 1920)
 *   quality   {number}  - JPEG quality 0–1 (default 0.82)
 * @returns {Promise<File>} Compressed File (JPEG)
 */
export async function compressImage(file, {
  maxWidth  = 1920,
  maxHeight = 1920,
  quality   = 0.82,
} = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("FileReader error"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image load error"));
      img.onload = () => {
        let { width, height } = img;

        // Scale down proportionally if needed
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width  = Math.round(width  * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width  = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
            // ตั้งชื่อไฟล์ใหม่เป็น .jpg
            const outName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
            resolve(new File([blob], outName, { type: "image/jpeg", lastModified: Date.now() }));
          },
          "image/jpeg",
          quality,
        );
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}
