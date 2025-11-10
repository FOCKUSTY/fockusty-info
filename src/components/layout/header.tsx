"use client";

import Link from "next/link";
import { Logo } from "@/components/logo/thevoid";
import { Api } from "api";
import { resolvePathName } from "@/api/paths";

type Props = {
  path: string;
  params: Record<string, string>;
};

export const Header = ({ path, params }: Props) => {
  return (
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
    </header>
  );
};

export default Header;
