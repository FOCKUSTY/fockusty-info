"use client";

import Image from "next/image";

type Props = {
  halloweenEnabled: boolean;
};

export const Human = ({ halloweenEnabled }: Props) => {
  return (
    <div className="human-container">
      <Image
        width={halloweenEnabled ? 3086 : 597}
        height={halloweenEnabled ? 2500 : 935}
        className={["human noselect", halloweenEnabled ? "hallowen-human" : ""].join(" ")}
        src={halloweenEnabled ? "/ghost.png" : "/human.png"}
        alt="human"
      />
    </div>
  );
};

export default Human;
