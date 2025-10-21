import type { ReactNode } from "react";
import type { GroupType } from "@/api/paths";

import Link from "next/link";

export const DATE_OF_BIRTH = {
  year: 2009,
  month: 7,
  day: 1,
  hours: 4,
} as const;
export const NICKNAME: ReactNode = "FOCKUSTY";

export const INFO: Record<GroupType, ReactNode> = {
  photographer: (
    <span>
      Я являюсь фотографом-любителем, обычно просто фотографировал{" "}
      <Link href="/me/photographer/info">своих...</Link>
    </span>
  ),
  programmer: (
    <span>
      Моя основная деятельность — программирование,{" "}
      <Link href="/me/programmer/info">оно также является...</Link>
    </span>
  ),
};
