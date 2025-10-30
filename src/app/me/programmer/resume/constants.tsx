import type { ReactNode } from "react";

import { Api } from "@/api";
import { Link } from "@/components/link";

import styles from "./styles.module.css";

export interface SkillCategory {
  id: string;
  title: ReactNode;
  items: ReactNode[];
}

type PackageProps = { packages: string[] };

const PackageLinks = ({ packages }: PackageProps) => {
  return packages.map((name) => (
    <a
      key={name + packages.length}
      className={styles.data_list__item}
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  ));
};

export const PERSONAL_INFO = {
  name: "Айдар Рустемович Башаров",
  position: "Backend разработчик (Nest.js)",
};

export const CONTACT_INFO: {
  name: string;
  content: ReactNode;
}[] = [
  {
    name: "Email",
    content: (
      <Link
        href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwQMMBlzQSnzWdPtXTfZprQXsBjhtMhvDktgcZrbNnMpLdzTJrKjSfQqmVfwRDmfrRHdvzg"
        name="viserd.yt@gmail.com"
      />
    ),
  },
  {
    name: "Телефон",
    content: "+7 ??? ??? ????",
  },
  {
    name: "GitHub",
    content: <Link href={Api.fockusty.github_url} name="FOCKUSTY" />,
  },
  {
    name: "Telegram",
    content: <Link href={Api.fockusty.telegram_url} name="FOCKUSTY" />,
  },
  {
    name: "Discord",
    content: <Link href={Api.fockusty.discord_url} name="The Void" />,
  },
];

export const SKILLS: SkillCategory[] = [
  {
    id: "Frontend",
    title: <h3>Frontend</h3>,
    items: [
      <Link key={"f1"} href="https://nextra.site/" name="Nextra" />,
      <Link key={"f2"} href="https://nextjs.org/" name="Next.js" />,
      <Link key={"f3"} href="https://react.dev/" name="React.js" />,
      <Link key={"f4"} href="https://developer.mozilla.org/en-US/docs/Web/HTML" name="HTML" />,
      <Link key={"f5"} href="https://developer.mozilla.org/en-US/docs/Web/CSS" name="CSS" />,
    ],
  },
  {
    id: "Backend",
    title: <h3>Backend</h3>,
    items: [
      <Link key={"b1"} href="https://www.passportjs.org/" name="Passport.js" />,
      <Link key={"b2"} href="https://nestjs.com/" name="Nest.js" />,
      <Link key={"b3"} href="https://expressjs.com/" name="Express.js" />,
      <Link
        key={"b4"}
        href="https://www.redhat.com/en/topics/api/what-is-a-rest-api"
        name="REST API"
      />,
      <Link
        key={"b5"}
        href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
        name="Websocket"
      />,
      <Link key={"b6"} href="https://socket.io/docs/v4/" name="Socket.io" />,
    ],
  },
  {
    id: "Общее",
    title: <h3>Общее</h3>,
    items: [
      <Link key={"m1"} href="https://nodejs.org/" name="Node.js" />,
      <Link
        key={"m2"}
        href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions"
        name="Регулярные выражения (MDN)"
      />,
      <Link key={"m3"} href="https://regex101.com" name="RegExp101" />,
      <Link key={"m4"} href="https://mochajs.org" name="Mocha.js" />,
    ],
  },
  {
    id: "Базы данных",
    title: <h3>Базы данных</h3>,
    items: [
      <Link key={"db1"} href="https://www.mongodb.com/" name="MongoDB" />,
      <Link key={"db2"} href="https://www.sqlite.org/index.html" name="SQLite" />,
    ],
  },
  {
    id: "Инструменты",
    title: <h3>Инструменты</h3>,
    items: [
      <Link key={"i1"} href="https://code.visualstudio.com/" name="Visual Studio Code" />,
      <Link key={"i2"} href="https://visualstudio.microsoft.com/" name="Visual Studio" />,
      <Link key={"i3"} href="https://www.adobe.com/products/photoshop.html" name="Photoshop" />,
      <Link key={"i4"} href="https://desktop.github.com/" name="GitHub Desktop" />,
      <Link key={"i5"} href="https://about.gitlab.com/" name="GitLab" />,
      <Link key={"i6"} href="https://github.com/" name="GitHub" />,
      <Link key={"i7"} href="https://git-scm.com/" name="Git" />,
      <Link key={"i8"} href="https://www.figma.com/" name="Figma" />,
      <Link key={"i9"} href="https://www.docker.com/" name="Docker" />,
    ],
  },
  {
    id: "Языки программирования",
    title: <h3>Языки программирования</h3>,
    items: [
      <Link key={"pl1"} href="https://javascript.info/" name="JavaScript" />,
      <Link key={"pl2"} href="https://www.typescriptlang.org/docs/" name="TypeScript" />,
      <Link key={"pl3"} href="https://docs.python.org/3/tutorial/" name="Python" />,
      <Link
        key={"pl4"}
        href="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
        name="C#"
      />,
      <Link key={"pl5"} href="https://go.dev/learn/" name="GoLang" />,
    ],
  },
];

export const EXPERIENCE: {
  position: ReactNode;
  company?: ReactNode;
  period?: ReactNode;
  responsibilities: ReactNode[];
}[] = [
  {
    company: (
      <a
        href="https://github.com/Lazy-And-Focused"
        target="_blank"
        rel="noopener noreferrer"
        style={{ animation: "0" }}
      >
        Lazy And Focused (my command)
      </a>
    ),
    period: "2024-now",
    position: "CEO, Backend developer",
    responsibilities: [
      "Управление командой",
      "Ревью кода",
      <span key={"exp-laf-1"}>
        Разработка своей бэкенд-архитектуры <PackageLinks packages={["BAD"]} /> А также библиотеки
        для неё: <PackageLinks packages={["bad-fockarch"]} />
      </span>,
      "Описание проектов и создание документаций",
      <div key={"exp-laf-2"} style={{ display: "flex", flexDirection: "column" }}>
        <span>Разработка REST API (CRUD) с использованием</span>
        <div className={styles.data_list}>
          <PackageLinks
            packages={[
              "@nestjs/swagger",
              "@nestjs/testing",
              "@nestjs/schematics",
              "cache-manager",
              "cors",
            ]}
          />
          <Link className={styles.data_list__item} href="https://www.mongodb.com/" name="MongoDB" />
          <span className={styles.data_list__item}>Кэширования</span>
        </div>
      </div>,
      "Разработка системы аутентификации через отдельный сервис",
    ],
  },
  {
    company: "The Void (my command)",
    period: "2023-now",
    position: "CEO",
    responsibilities: [
      <span key={"exp-tvc-1"}>
        Разработка единой системы базы данных (ЕСБД) (
        <Link
          href="https://www.npmjs.com/package/@thevoidcommunity/the-void-database"
          name="npm-пакет"
        />
        )
      </span>,
      "Разработка бота, используя ЕСБД, discord.js, telegraf",
      "Разработка панели управления для Discord бота на Next.js, Nest.js",
      "Использование OpenAi и Ollama для создания чат-ботов",
    ],
  },
  {
    position: "Личные достижения",
    responsibilities: [
      "Управление своей командой: Lazy And Focused",
      <div key={"exp-my-1"} style={{ display: "flex", flexDirection: "column", gap: "7.5px" }}>
        <span>Создание библиотек для упрощения работы:</span>
        <div className={styles.data_list}>
          {
            <PackageLinks
              packages={[
                "f-formatter",
                "fbit-field",
                "fock-logger",
                "fock-builder",
                "fouter",
                "bad-fockarch",
              ]}
            />
          }
        </div>
      </div>,
    ],
  },
];
