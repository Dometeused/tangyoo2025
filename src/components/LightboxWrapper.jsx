"use client";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export default function LightboxWrapper({ image, onClose }) {
  return (
    <Lightbox
      open={!!image}
      close={onClose}
      slides={[{ src: image }]}
    />
  );


  const sources = images.map((img) => ({
    src: img.url,
    alt: img.name,
  }));

  return (
    <Lightbox
      open={true}
      close={onClose}
      slides={sources}
      index={index >= 0 ? index : 0}
    />
  );
}
