"use client";

import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="halloween-banner">
      <Image src="/halloween/pumpkin_user.svg" alt="pumpkin" width={48} height={48} />
      <div className="text">Happy Halloween — Счастливого Хэллоуина!</div>
    </div>
  );
};

export default Banner;
