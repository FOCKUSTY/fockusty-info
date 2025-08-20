'use client'

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import { Logo } from "components/logo/thevoid";
import { Api } from "api";

import "./globals.css";
import SpaceAnimation from "@/components/space";
import { useEffect, useState } from "react";

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

  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Image
          width={1920}
          height={1080}
          className="background"
          src={"/background.png"}
          alt="background"
        />

        <header>
          <Logo head={<h1 id="main-logo">FOCKUSTY</h1>} links={Api.fockusty} />
  
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
          <Logo head={<h2>© {date} The Void</h2>} links={Api.the_void} />
        </footer>
      </body>
    </html>
  );
}

export default RootLayout;
