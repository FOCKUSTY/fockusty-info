"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { usePathname, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/halloween/banner";
import SpaceAnimation from "@/components/space";
import useMediaQuery from "@/hooks/media.hook";
import useHalloweenEnabled from "@/hooks/halloween.hook";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Human from "@/components/layout/human";

import { PATHS_MAP } from "@/lib/layout/constants";
import { resolvePathName } from "@/api/paths";
import { Api } from "api";

import "./globals.css";
import "./halloween.css";

const now = `${new Date().getFullYear()}`;
const date = "2025" === now ? now : "2025-" + now;

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);
  const [halloweenEnabled, setHalloweenEnabled] = useHalloweenEnabled();

  const path = usePathname();
  const params: Record<string, string> = useParams();

  return (
    <html lang="ru">
      <title>Portfolio</title>
      <meta name="description" content="FOCKUSTY portfolio site" />
      <meta name="keywords" content={Api.key_words.join(",")} />
      <body className={halloweenEnabled ? "halloween" : ""}>
        <div className="background"></div>

        <Header animationEnabled={animationEnabled} setAnimationEnabled={setAnimationEnabled} path={path} params={params} />

        {halloweenEnabled ? <Banner /> : null}

        <SpaceAnimation enabled={animationEnabled}>
          <Human halloweenEnabled={halloweenEnabled} />

          <main>
            <div className="children-wrapper">{children}</div>

            <Footer halloweenEnabled={halloweenEnabled} setHalloweenEnabled={setHalloweenEnabled} date={date} paths={PATHS_MAP} currentPath={path} params={params} />
          </main>
        </SpaceAnimation>
      </body>
    </html>
  );
};

export default RootLayout;
