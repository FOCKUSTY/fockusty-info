'use client'

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import Link from "next/link";
import { useState } from "react";

import SpaceAnimation from "components/space";
import useMediaQuery from "@/hooks/media.hook";
import { Logo } from "components/logo/thevoid";
import { PATHS } from "@/api/paths";

import { Api } from "api";

import { usePathname } from "next/navigation";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const now = `${new Date().getFullYear()}`;
const date = "2025" === now
  ? now
  : "2025-" + now;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [ animationEnabled, setAnimationEnabled ] = useState<boolean>(false);
  const isLessThanMinimal = useMediaQuery("(max-width: 425px)")

  const path = usePathname();

  return (
    <html lang="ru">
      <title>Portfolio</title>
      <meta name="description" content="FOCKUSTY portfolio site" />
      <meta name="keywords" content="fockusty,fickus,programmer,photographer,designer,фокусти,фикус,фокус,программист,фотограф,дизайнер" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          className="background"
        >
        </div>

        <header>
          <Logo head={<Link href={"/"}><h1 id="main-logo">FOCKUSTY</h1></Link>} links={Api.fockusty} />
  
          <h2 className="path">
            {PATHS[path] || "404"}
          </h2>

          <button
            id="animation-button"
            onClick={(event) => {
              setAnimationEnabled(!animationEnabled);

              if (event.currentTarget.disabled) {
                return;
              };

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
          
          <main>
            {children}
          </main>
        </SpaceAnimation>
        <footer>
          <Logo
            id="footer-logo"
            head={<h2>© {date} The Void</h2>}
            links={isLessThanMinimal
              ? Api.fockusty
              : Api.the_void
            }
          />
        </footer>
      </body>
    </html>
  );
}

export default RootLayout;
