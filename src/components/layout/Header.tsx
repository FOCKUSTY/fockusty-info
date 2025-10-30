// Deprecated duplicate module kept for Windows case-insensitive filesystem compatibility.
// The real implementation lives in `src/components/layout/header.tsx` (kebab-case).
export {};
"use client";

import Link from "next/link";
import { Logo } from "@/components/logo/thevoid";
import { Api } from "api";
import { resolvePathName } from "@/api/paths";
import useMediaQuery from "@/hooks/media.hook";

type Props = {
  animationEnabled: boolean;
  setAnimationEnabled: (v: boolean) => void;
  path: string;
  params: Record<string, string>;
};

export const Header = ({ animationEnabled, setAnimationEnabled, path, params }: Props) => {
  const isLessThanMinimal = useMediaQuery("(max-width: 425px)");

  return (
    <header>
      <Logo
        head={
          <Link href={'/'}>
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
  );
};

export default Header;
