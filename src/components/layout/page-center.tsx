import type { ReactNode } from "react";

export const PageCenter = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={["page-center", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
};

export default PageCenter;
