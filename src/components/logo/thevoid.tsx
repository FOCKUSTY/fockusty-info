import { Api } from "api"

import { FaDiscord, FaGithub, FaTelegram } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";

export const Logo = ({
  links,
  head,
  id
}: {
  links: Record<keyof typeof Api.fockusty, string>,
  head: React.ReactNode,
  id?: string
}) => {
  return (
    <div id={id} className="logo">
      {head}
      
      <div className="links">
        <a href={links.discord_url} target="_blank">
          <FaDiscord size={24} />
        </a>
        <a href={links.telegram_url} target="_blank">
          <FaTelegram size={24} />
        </a>
        <a href={links.github_url} target="_blank">
          <FaGithub size={24} />
        </a>
        <a href={links.site} target="_blank">
          <SlGlobe size={24} />
        </a>
      </div>
    </div>
  )
}