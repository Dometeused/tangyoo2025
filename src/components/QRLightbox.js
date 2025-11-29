"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function QRLightbox({ url }) {
  const [open, setOpen] = useState(false);
  if (!url) return null;

  return (
    <>
      <img
        src={url}
        onClick={() => setOpen(true)}
        alt="QR Code"
        className="w-14 h-14 rounded border cursor-pointer"
      />
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: url }]}
        />
      )}
    </>
  );
}
