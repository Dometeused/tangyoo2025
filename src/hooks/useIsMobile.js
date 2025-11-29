// src/hooks/useIsMobile.js
import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    check(); // run once on mount
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

