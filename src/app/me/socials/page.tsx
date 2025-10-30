import type { IconType } from "react-icons";

import { SlGlobe } from "react-icons/sl";
import { FaXTwitter, FaBluesky } from "react-icons/fa6";
import { TbBrandGravatar } from "react-icons/tb";
import {
  FaPinterest,
  FaGithub,
  FaPatreon,
  FaFacebook,
  FaInstagram,
  FaVk,
  FaSteam,
} from "react-icons/fa";

import { Link } from "@/components/link";
import PageCenter from "@/components/layout/PageCenter";

const SOCIALS: {
  [name: string]: [string, IconType];
} = {
  site: ["https://fockusty.netlify.app/", SlGlobe],
  X: ["https://x.com/fockusty", FaXTwitter],
  Pinterest: ["https://ru.pinterest.com/fockusty", FaPinterest],
  BlueSky: ["https://bsky.app/profile/fockusty.bsky.social", FaBluesky],
  Gravatar: ["https://gravatar.com/fockusty", TbBrandGravatar],
  GitHub: ["https://github.com/FOCKUSTY", FaGithub],
  Patreon: ["https://patreon.com/FOCKUSTY", FaPatreon],
  Facebook: [
    "https://www.facebook.com/profile.php?id=61567429765302",
    FaFacebook,
  ],
  Instagram: ["https://www.instagram.com/fockusty", FaInstagram],
  Vkontakte: ["https://vk.com/fockusty", FaVk],
  Steam: ["https://steamcommunity.com/id/fockusty/", FaSteam],
};

const Page = () => {
  return (
    <PageCenter style={{ justifySelf: "center" }}>
      Мои соцсети!
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2px",
          width: "200px",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {Object.keys(SOCIALS).map((social) => {
          const [link, Icon] = SOCIALS[social];

          return (
            <Link
              key={link}
              href={link}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
                width: "100%",
              }}
            >
              <Icon size={24} /> {social}
            </Link>
          );
        })}
      </div>
    </PageCenter>
  );
};

export default Page;
