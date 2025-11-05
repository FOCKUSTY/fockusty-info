import { ContactItem, ExperienceEntry, SkillCategoryData } from "@/types/resume.types";


export const PERSONAL_INFO = {
  name: "Айдар Рустемович Башаров",
  position: "Веб-разработчик (Next.js/Nest.js)",
};

export const CONTACT_INFO: ContactItem[] = [
  {
    name: "Email",
    href: "mailto:viserd.yt@gmail.com",
    label: "viserd.yt@gmail.com",
  },
  {
    name: "Телефон",
    label: "+7 ??? ??? ????",
    href: "tel:+7??????????",
  },
  {
    name: "GitHub",
    href: "https://github.com/FOCKUSTY",
    label: "FOCKUSTY",
  },
  {
    name: "Telegram",
    href: "https://t.me/FOCKUSTY",
    label: "FOCKUSTY",
  },
  {
    name: "Discord",
    href: "https://discord.gg/thevoid",
    label: "The Void",
  },
];

export const SKILLS: SkillCategoryData[] = [
  {
    id: "Frontend",
    title: "Frontend",
    items: [
      { name: "Nextra", href: "https://nextra.site/" },
      { name: "Next.js", href: "https://nextjs.org/" },
      { name: "React.js", href: "https://react.dev/" },
      {
        name: "HTML",
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      { name: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
  },
  {
    id: "Backend",
    title: "Backend",
    items: [
      { name: "Passport.js", href: "https://www.passportjs.org/" },
      { name: "Nest.js", href: "https://nestjs.com/" },
      { name: "Express.js", href: "https://expressjs.com/" },
      {
        name: "REST API",
        href: "https://www.redhat.com/en/topics/api/what-is-a-rest-api",
      },
      {
        name: "Websocket",
        href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
      },
      { name: "Socket.io", href: "https://socket.io/docs/v4/" },
    ],
  },
  {
    id: "Общее",
    title: "Общее",
    items: [
      { name: "Node.js", href: "https://nodejs.org/" },
      {
        name: "Регулярные выражения (MDN)",
        href: "https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions",
      },
      { name: "RegExp101", href: "https://regex101.com" },
      { name: "Mocha.js", href: "https://mochajs.org" },
    ],
  },
  {
    id: "Базы данных",
    title: "Базы данных",
    items: [
      { name: "MongoDB", href: "https://www.mongodb.com/" },
      { name: "SQLite", href: "https://www.sqlite.org/index.html" },
      {
        name: "Prisma (postgres)",
        href: "https://www.prisma.io/docs/postgres",
      },
    ],
  },
  {
    id: "Инструменты",
    title: "Инструменты",
    items: [
      { name: "Visual Studio Code", href: "https://code.visualstudio.com/" },
      { name: "Visual Studio", href: "https://visualstudio.microsoft.com/" },
      {
        name: "Photoshop",
        href: "https://www.adobe.com/products/photoshop.html",
      },
      { name: "GitHub Desktop", href: "https://desktop.github.com/" },
      { name: "GitLab", href: "https://about.gitlab.com/" },
      { name: "GitHub", href: "https://github.com/" },
      { name: "Git", href: "https://git-scm.com/" },
      { name: "Figma", href: "https://www.figma.com/" },
      { name: "Docker", href: "https://www.docker.com/" },
    ],
  },
  {
    id: "Языки программирования",
    title: "Языки программирования",
    items: [
      { name: "JavaScript", href: "https://javascript.info/" },
      { name: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
      { name: "Python", href: "https://docs.python.org/3/tutorial/" },
      {
        name: "C#",
        href: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/",
      },
      { name: "GoLang", href: "https://go.dev/learn/" },
    ],
  },
  {
    id: "Разработка ботов",
    title: "Разработка ботов",
    items: [
      { name: "Telegraf.js", href: "https://telegraf.js.org" },
      { name: "Discord.js", href: "https://discord.js.org" },
    ],
  },
  {
    id: "API",
    title: "API",
    items: [
      {
        name: "Discord API",
        href: "https://discord.com/developers/docs/intro",
      },
      { name: "Bluesky API", href: "https://docs.bsky.app/docs/get-started" },
    ],
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: {
      name: "Lazy And Focused",
      href: "https://github.com/Lazy-And-Focused",
    },
    period: "2024-now",
    position: "CEO, Backend developer",
    responsibilities: [
      { type: "text", text: "Управление командой" },
      { type: "text", text: "Ревью кода" },
      {
        type: "group",
        title: "Разработка своей бэкенд-архитектуры",
        items: [
          { type: "packages", packages: ["BAD"] },
          { type: "packages", packages: ["bad-fockarch"] },
        ],
      },
      { type: "text", text: "Описание проектов и создание документаций" },
      {
        type: "group",
        title: "Разработка REST API (CRUD) с использованием",
        items: [
          {
            type: "packages",
            packages: [
              "@nestjs/swagger",
              "@nestjs/testing",
              "@nestjs/schematics",
              "cache-manager",
              "cors",
            ],
          },
          { type: "link", name: "MongoDB", href: "https://www.mongodb.com/" },
          { type: "text", text: "Кэширования" },
        ],
      },
      {
        type: "text",
        text: "Разработка системы аутентификации через отдельный сервис",
      },
    ],
  },
  {
    company: { name: "The Void (my command)" },
    period: "2023-now",
    position: "CEO",
    responsibilities: [
      {
        type: "link",
        href: "https://www.npmjs.com/package/@thevoidcommunity/the-void-database",
        label: "Разработка единой системы базы данных (ЕСБД)",
        name: "npm-пакет"
      },
      {
        type: "text",
        text: "Разработка бота, используя ЕСБД, discord.js, telegraf",
      },
      {
        type: "text",
        text: "Разработка панели управления для Discord бота на Next.js, Nest.js",
      },
      {
        type: "text",
        text: "Использование OpenAi и Ollama для создания чат-ботов",
      },
    ],
  },
  {
    position: "Личные достижения",
    responsibilities: [
      { type: "text", text: "Управление своей командой: Lazy And Focused" },
      {
        type: "group",
        items: [
          { type: "text", text: "Создание библиотек для упрощения работы:" },
          {
            type: "packages",
            packages: [
              "f-formatter",
              "fbit-field",
              "fock-logger",
              "fock-builder",
              "fouter",
              "bad-fockarch",
            ],
          },
        ],
      },
    ],
  },
];

export default {
  PERSONAL_INFO,
  CONTACT_INFO,
  SKILLS,
  EXPERIENCE,
};
