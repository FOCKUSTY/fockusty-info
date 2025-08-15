import type { Metadata } from "next";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import { Logo } from "components/logo/thevoid";
import { Api } from "api";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOCKUSTY info",
  description: "site-portfolio",
};

const date = "2025-" + new Date().getFullYear();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
        <div className="human-container">
          <Image
            width={597}
            height={935}
            className="human noselect"
            src="/human.png"
            alt="human"
          />
        </div>

        <header>
          <Logo head={<h1 id="main-logo">FOCKUSTY</h1>} links={Api.fockusty} />
        </header>

        <main>
          {children}
        </main>

        <footer>
          <Logo head={<h2>© {date} The Void</h2>} links={Api.the_void} />
        </footer>
      </body>
    </html>
  );
}

export default RootLayout;
