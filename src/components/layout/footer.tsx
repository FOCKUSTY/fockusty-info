"use client";

import { Logo } from "@/components/logo/thevoid";
import { Api } from "api";
import { PathsSection } from "./sections";
import useMediaQuery from "@/hooks/media.hook";

type Props = {
  date: string;
  paths: Record<string, string>;
  currentPath: string;
  params: Record<string, string>;
};

export const Footer = ({ date, paths, currentPath }: Props) => {
  const isLessThanMinimal = useMediaQuery("(max-width: 425px)");
  const isLessThanMinimalTabletop = useMediaQuery("(max-width: 768px)");

  return (
    <footer>
      <Logo
        id="footer-logo"
        head={<h2>© {date} The Void</h2>}
        links={isLessThanMinimal ? Api.fockusty : Api.the_void}
      />

      <PathsSection
        paths={paths}
        currentPath={currentPath}
        className={
          isLessThanMinimalTabletop ? "paths-vertical" : "paths-horizontal"
        }
      />
    </footer>
  );
};

export default Footer;
