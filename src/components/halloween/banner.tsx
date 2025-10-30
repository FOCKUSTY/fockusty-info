"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "halloween_banner_closed";

const Banner = () => {
  const [closed, setClosed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setClosed(saved === "1");
    } catch (e) {
      // ignore
    }
  }, []);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      // ignore
    }

    setClosed(true);
  };

  if (closed) return null;

  return (
    <div className="halloween-banner" role="region" aria-label="Halloween banner">
      <Image src="/halloween/pumpkin_user.svg" alt="pumpkin" width={48} height={48} />
      <div className="text">Happy Halloween — Счастливого Хэллоуина!</div>
      <button className="banner-close" onClick={close} aria-label="Закрыть баннер">
        ×
      </button>
    </div>
  );
};

export default Banner;
