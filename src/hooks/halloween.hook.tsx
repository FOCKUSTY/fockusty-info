"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "halloween_enabled";

export default function useHalloweenEnabled() {
  const [enabled, setEnabled] = useState<boolean>(false);

  // initialize from localStorage or date range
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        setEnabled(saved === "1");
        return;
      }

      const nowDate = new Date();
      const month = nowDate.getMonth(); // 0-based: Oct = 9
      const day = nowDate.getDate();

      const inRange = (month === 9 && day >= 25) || (month === 10 && day <= 2);

      setEnabled(inRange);
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  // persist whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch (e) {
      // ignore
    }
  }, [enabled]);

  return [enabled, setEnabled] as const;
}
