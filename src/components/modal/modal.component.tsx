"use client";

import type { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

import { useState } from "react";
import { createPortal } from "react-dom";

type HtmlProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "id" | "onClick"
>;
type Props = {
  actived: boolean;
  onClick: () => void;
  id: string;
  html: HtmlProps;
  children: ReactNode;
};

export const ModalComponent = ({ actived, onClick, html, children, id }: Props) => {
  if (!actived) {
    return null;
  }

  return createPortal(
    <div
      {...html}
      id={id}
      onClick={(event) => {
        const div = event.target as HTMLDivElement;
        if (div.id !== id) {
          return;
        }

        onClick();
      }}
    >
      {children}
    </div>,
    document.body
  );
};

type HookProps = {
  id: string;
};

export const useModal = ({ id }: HookProps) => {
  const [actived, setActived] = useState<boolean>(false);

  return {
    setActived,
    actived,
    ModalComponent: (props: HtmlProps) =>
      actived
        ? createPortal(
            <div
              {...props}
              id={id}
              onClick={(event) => {
                const div = event.target as HTMLDivElement;
                if (div.id !== id) {
                  return;
                }

                setActived((actived) => !actived);
              }}
            >
              {props.children}
            </div>,
            document.body
          )
        : null,
  };
};
