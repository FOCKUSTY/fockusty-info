"use client";

import Link from "next/link";
import React from "react";

type Props = {
  paths: Record<string, string>;
  currentPath?: string | null;
  className?: string;
};

export const PathsSection = ({ paths, currentPath, className }: Props) => {
  return (
    <div className={className}>
      {Object.keys(paths).map((key) => {
        if (currentPath === key) return null;

        return (
          <Link key={key} href={key} className="path-link">
            {paths[key]}
          </Link>
        );
      })}
    </div>
  );
};

export default PathsSection;
