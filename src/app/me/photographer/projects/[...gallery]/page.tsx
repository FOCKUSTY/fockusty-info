"use client";

import { Gallery } from "../gallery";
import { Suspense } from "react";

const Page = ({ searchParams }: { searchParams: Promise<{ category?: string }> }) => {
  return (
    <Suspense fallback={<>...</>}>
      <Gallery uniqueEnabled query={searchParams} />
    </Suspense>
  );
};

export default Page;
