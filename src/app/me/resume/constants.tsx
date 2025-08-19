import { Api } from "@/api";
import styles from "./styles.module.css";
import React from "react";

export interface SkillCategory {
  id: string
  title: React.ReactNode;
  items: React.ReactNode[];
};

const PackageLinks = ({ packages }: { packages: string[]}) => {
  return packages.map(name => (
    <a
      key={name + packages.length}
      className={styles.data_list__item}
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  ))
}

type LinkProps = ({
  children?: undefined,
  name: string
} | {
  children: React.ReactNode,
  name?: undefined
}) & {
  href: string,
  className?: string
}

const Link = ({
  children,
  className,
  href,
  name
}: LinkProps) => {
  return <a className={className} key={href} href={href} target="_blank" rel="noopener noreferrer">{children ?? name}</a>;
}

export const PERSONAL_INFO = {
  name: "Айдар Рустемович Башаров",
  position: "Backend разработчик (Nest.js)",
};

export const CONTACT_INFO: {
  name: string,
  content: React.ReactNode
}[] = [
  {
    name: "Email",
    content: "viserd.yt@gmail.com"
  },
  {
    name: "Телефон",
    content: "+7 ??? ??? ????"
  },
  {
    name: "GitHub",
    content: <Link href={Api.fockusty.github_url} name="FOCKUSTY" />
  },
  {
    name: "Telegram",
    content: <Link href={Api.fockusty.telegram_url} name="FOCKUSTY" />
  },
  {
    name: "Discord",
    content: <Link href={Api.fockusty.discord_url} name="The Void" />
  }
];

export const SKILLS: SkillCategory[] = [
  {
    id: "Frontend",
    title: <h3>Frontend</h3>,
    items: [
      <Link href="https://nextra.site/" name="Nextra"/>,
      <Link href="https://nextjs.org/" name="Next.js"/>,
      <Link href="https://react.dev/" name="React.js"/>,
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML" name="HTML"/>,
      <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS" name="CSS"/>
    ]
  },
  {
    id: "Backend",
    title: <h3>Backend</h3>,
    items: [
      <Link href="https://www.passportjs.org/" name="Passport.js" />,
      <Link href="https://nestjs.com/" name="Nest.js" />,
      <Link href="https://expressjs.com/" name="Express.js" />,
      <Link href="https://www.redhat.com/en/topics/api/what-is-a-rest-api" name="REST API" />,
      <Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" name="Websocket" />,
      <Link href="https://socket.io/docs/v4/" name="Socket.io" />,
    ]
  },
  {
    id: "Общее",
    title: <h3>Общее</h3>,
    items: [
      <Link href="https://nodejs.org/" name="Node.js" />,
      <Link href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions" name="Регулярные выражения (MDN)" />,
      <Link href="https://regex101.com" name="RegExp101" />,
      <Link href="https://mochajs.org" name="Mocha.js" />
    ]
  },
  {
    id: "Базы данных",
    title: <h3>Базы данных</h3>,
    items: [
      <Link href="https://www.mongodb.com/" name="MongoDB" />,
      <Link href="https://www.sqlite.org/index.html" name="SQLite" />
    ]
  },
  {
    id: "Инструменты",
    title: <h3>Инструменты</h3>,
    items: [
      <Link href="https://code.visualstudio.com/" name="Visual Studio Code" />,
      <Link href="https://visualstudio.microsoft.com/" name="Visual Studio" />,
      <Link href="https://www.adobe.com/products/photoshop.html" name="Photoshop" />,
      <Link href="https://desktop.github.com/" name="GitHub Desktop" />,
      <Link href="https://about.gitlab.com/" name="GitLab" />,
      <Link href="https://github.com/" name="GitHub" />,
      <Link href="https://git-scm.com/" name="Git" />,
      <Link href="https://www.figma.com/" name="Figma" />,
      <Link href="https://www.docker.com/" name="Docker" />
    ]
  },
  {
    id: "Языки программирования",
    title: <h3>Языки программирования</h3>,
    items: [
      <Link href="https://javascript.info/" name="JavaScript" />,
      <Link href="https://www.typescriptlang.org/docs/" name="TypeScript" />,
      <Link href="https://docs.python.org/3/tutorial/" name="Python" />,
      <Link href="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/" name="C#" />,
      <Link href="https://go.dev/learn/" name="GoLang" />
    ]
  }
];

export const EXPERIENCE: {
  position: React.ReactNode,
  company?: React.ReactNode,
  period?: React.ReactNode,
  responsibilities: React.ReactNode[]
}[] = [
  {
    company:
      <a href="https://github.com/Lazy-And-Focused" target="_blank" rel="noopener noreferrer" style={{animation: "0"}}>
        Lazy And Focused (my command)
      </a>,
    period: "2024-now",
    position: "CEO, Backend developer",
    responsibilities: [
      "Управление командой",
      "Ревью кода",
      <span key={"exp-laf-1"}>
        Разработка своей бэкенд-архитектуры <PackageLinks packages={["BAD"]}/> А также библиотеки для неё: <PackageLinks packages={["bad-fockarch"]} />
      </span>,
      "Описание проектов и создание документаций",
      <div key={"exp-laf-2"} style={{display: "flex", flexDirection: "column"}}>
        <span>Разработка REST API (CRUD) с использованием</span>
        <div className={styles.data_list}>
          <PackageLinks packages={[
            "@nestjs/swagger",
            "@nestjs/testing",
            "@nestjs/schematics",
            "cache-manager",
            "cors"
          ]}/>
          <Link className={styles.data_list__item} href="https://www.mongodb.com/" name="MongoDB"/>
          <span className={styles.data_list__item}>Кэширования</span>
        </div>
      </div>,
      "Разработка системы аутентификации через отдельный сервис"
    ]
  },
  {
    company: "The Void (my command)",
    period: "2023-now",
    position: "CEO",
    responsibilities: [
      <span key={"exp-tvc-1"}>
        Разработка единой системы базы данных (ЕСБД)
        (<Link href="https://www.npmjs.com/package/@thevoidcommunity/the-void-database" name="npm-пакет" />)
      </span>,
      "Разработка бота, используя ЕСБД, discord.js, telegraf",
      "Разработка панели управления для Discord бота на Next.js, Nest.js",
      "Использование OpenAi и Ollama для создания чат-ботов"
    ]
  },
  {
    position: "Личные достижения",
    responsibilities: [
      "Управление своей командой: Lazy And Focused",
      <div key={"exp-my-1"} style={{display: "flex", flexDirection: "column", gap: "7.5px"}}>
        <span>Создание библиотек для упрощения работы:</span>
        <div className={styles.data_list}>
          {
            <PackageLinks packages={[
              "f-formatter",
              "fbit-field",
              "fock-logger",
              "fock-builder",
              "fouter",
              "bad-fockarch"
            ]} />
          }
        </div>
      </div>
    ]
  },
];