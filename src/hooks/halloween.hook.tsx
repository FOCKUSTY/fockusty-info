"use client";

import { useEffect, useState } from "react";

export default function useHalloweenEnabled() {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    try {
      const nowDate = new Date();
      const month = nowDate.getMonth();
      const day = nowDate.getDate();

      const inRange = (month === 9 && day >= 25) || (month === 10 && day <= 2);

      setEnabled(inRange);
    } catch {
      /* empty */
    }
  }, []);

  return [enabled, setEnabled] as const;
}
