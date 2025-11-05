import type { ReactNode } from "react";
import Image from "next/image";

export const ShortInfo = ({
  imgSrc = "/AVATAR--fockusty-2--style-meow.png",
  alt = "avatar",
  children,
  infoClassName,
  imageClassName,
}: {
  imgSrc?: string;
  alt?: string;
  children?: ReactNode;
  infoClassName: string;
  imageClassName: string;
}) => {
  return (
    <div className={[infoClassName, "noselect"].join(" ")}>
      {children ? <div className={imageClassName}>{children}</div> : null}
      <Image src={imgSrc} height={128} width={128} alt={alt} />
    </div>
  );
};

export default ShortInfo;
