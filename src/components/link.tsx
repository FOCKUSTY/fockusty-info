import type { ReactNode, AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  ((
    | {
        children?: undefined;
        name: string;
      }
    | {
        children: ReactNode;
        name?: undefined;
      }
  ) & {
    href: string;
    className?: string;
  });

export const Link = ({ children, name, ...props }: LinkProps) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children ?? name}
    </a>
  );
};
