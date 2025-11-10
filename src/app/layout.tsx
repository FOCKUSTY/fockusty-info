"use client";

import type { ReactNode } from "react";

import { usePathname, useParams } from "next/navigation";

import Banner from "@/components/halloween/banner";
import useHalloweenEnabled from "@/hooks/halloween.hook";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Human from "@/components/layout/human";

import { PATHS_MAP } from "@/lib/layout/constants";
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
  const [halloweenEnabled] = useHalloweenEnabled();

  const path = usePathname();
  const params: Record<string, string> = useParams();

  return (
    <html lang="ru">
      <title>Portfolio</title>
      <meta name="description" content="FOCKUSTY portfolio site" />
      <meta name="keywords" content={Api.key_words.join(",")} />
      <body className={halloweenEnabled ? "halloween" : ""}>
        <div className="background"></div>

        <Header path={path} params={params} />

        {halloweenEnabled ? <Banner /> : null}

        <Human halloweenEnabled={halloweenEnabled} />

        <main>
          <div className="children-wrapper">{children}</div>
          <Footer
            date={date}
            paths={PATHS_MAP}
            currentPath={path}
            params={params}
          />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
