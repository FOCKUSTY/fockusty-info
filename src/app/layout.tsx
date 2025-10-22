"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { usePathname, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import SpaceAnimation from "@/components/space";
import { Logo } from "@/components/logo/thevoid";
import { resolvePathName } from "@/api/paths";
import useMediaQuery from "@/hooks/media.hook";

import { Api } from "api";

import "./globals.css";

const now = `${new Date().getFullYear()}`;
const date = "2025" === now ? now : "2025-" + now;

const paths: Record<string, string> = {
  "/": "Главная",
  "/introduction": "Вступление",
  "/me/socials": "Мои соцсети",
  "/me/info": "Информация обо мне",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);
  const isLessThanMinimal = useMediaQuery("(max-width: 425px)");
  const isLessThanMinimalTabletop = useMediaQuery("(max-width: 768px)");

  const path = usePathname();
  const params: Record<string, string> = useParams();

  return (
    <html lang="ru">
      <title>Portfolio</title>
      <meta name="description" content="FOCKUSTY portfolio site" />
      <meta name="keywords" content={Api.key_words.join(",")} />
      <body>
        <div className="background"></div>

        <header>
          <Logo
            head={
              <Link href={"/"}>
                <h1 id="main-logo">FOCKUSTY</h1>
              </Link>
            }
            links={Api.fockusty}
          />

          <h2 className="path">{resolvePathName(path, params)}</h2>

          <button
            id="animation-button"
            onClick={(event) => {
              setAnimationEnabled(!animationEnabled);

              if (event.currentTarget.disabled) {
                return;
              }

              const button = event.currentTarget;

              button.disabled = true;
              setTimeout(() => {
                button.disabled = false;
              }, 10000);
            }}
          >
            В{animationEnabled ? "ы" : ""}ключить анимации?
          </button>
        </header>

        <SpaceAnimation enabled={animationEnabled}>
          <div className="human-container">
            <Image
              width={597}
              height={935}
              className="human noselect"
              src="/human.png"
              alt="human"
            />
          </div>

          <main>{children}</main>
        </SpaceAnimation>

        <footer>
          <Logo
            id="footer-logo"
            head={<h2>© {date} The Void</h2>}
            links={isLessThanMinimal ? Api.fockusty : Api.the_void}
          />

          <div
            style={{
              display: "flex",
              gap: "0.5em",
              flexDirection: isLessThanMinimalTabletop ? "column" : "row",
            }}
          >
            {Object.keys(paths).map((key) => {
              if (path === key) {
                return null;
              }

              return (
                <Link key={key} href={key}>
                  {paths[key]}
                </Link>
              );
            })}
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
