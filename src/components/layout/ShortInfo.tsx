import Image from "next/image";
import type { ReactNode } from "react";

export const ShortInfo = ({
  imgSrc = "/AVATAR--fockusty-2--style-meow.png",
  alt = "avatar",
  children,
}: {
  imgSrc?: string;
  alt?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={["short_info", "noselect"].join(" ")}>
      {children ? <div className={["short_info__name", "short_info"].join(" ")}>{children}</div> : null}
      <Image src={imgSrc} height={128} width={128} alt={alt} />
    </div>
  );
};

export default ShortInfo;
