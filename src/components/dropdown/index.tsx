"use client";

import type { RefObject } from "react";
import { useRef, useState } from "react";

import styles from "./dropdown.module.css";

export const useDropdown = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const content = useRef<HTMLDivElement>(null);
  const [actived, setActived] = useState<boolean>(false);

  const Dropdown = ({
    children,
    summary,
  }: {
    children: React.ReactNode;
    summary: React.ReactNode;
  }) => {
    return (
      <div className={`${styles.dropdown}`}>
        <div
          className={styles.summary}
          onClick={(event) => {
            if (!content.current) return;

            setActived(!actived);

            const parent = event.currentTarget.getBoundingClientRect();

            content.current.style.top = `${parent.top + parent.height}px`;
            content.current.style.left = `${parent.left + parent.width - content.current.getBoundingClientRect().width}px`;
          }}
        >
          {summary}
        </div>
        {actived ? (
          <div
            id={id}
            className={`${styles.content} ${className}`}
            ref={content}
          >
            {children}
          </div>
        ) : (
          <div ref={content}></div>
        )}
      </div>
    );
  };

  return { setActived, content, Dropdown } as const;
};

export const Dropdown = ({
  children,
  summary,
  ref,
  className,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  ref: RefObject<HTMLDivElement | null>;
  className?: string;
}) => {
  return (
    <div className={`${styles.dropdown}`}>
      <div
        className={styles.summary}
        onClick={(event) => {
          if (!ref.current) return;

          const parent = event.currentTarget.getBoundingClientRect();

          ref.current.style.display =
            ref.current.style.display === "flex" ? "none" : "flex";

          ref.current.style.top = `${parent.top + parent.height}px`;
          ref.current.style.left = `${parent.left + parent.width - ref.current.getBoundingClientRect().width}px`;
        }}
      >
        {summary}
      </div>
      {
        <div
          style={{ display: "none" }}
          className={`${styles.content} ${className}`}
          ref={ref}
        >
          {children}
        </div>
      }
    </div>
  );
};
