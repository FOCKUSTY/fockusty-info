"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "halloween_banner_closed";

const Banner = () => {
  const [closed, setClosed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setClosed(saved === "1");
    } catch {
      /* empty */
    }
  }, []);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* empty */
    }

    setClosed(true);
  };

  if (closed) return null;

  return (
    <div
      className="halloween-banner"
      role="region"
      aria-label="Halloween banner"
    >
      <Image
        src="/halloween/pumpkin.svg"
        alt="pumpkin"
        width={48}
        height={48}
      />
      <div className="text">Happy Halloween — Счастливого Хэллоуина!</div>
      <button
        className="banner-close"
        onClick={close}
        aria-label="Закрыть баннер"
      >
        ×
      </button>
    </div>
  );
};

export default Banner;
