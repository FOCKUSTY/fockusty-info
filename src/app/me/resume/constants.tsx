import { Api } from "@/api";

export interface SkillCategory {
  id: string
  title: React.ReactNode;
  items: React.ReactNode[];
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
    content: <a href={Api.fockusty.github_url} target="_blank">FOCKUSTY</a>
  },
  {
    name: "Telegram",
    content: <a href={Api.fockusty.telegram_url} target="_blank">FOCKUSTY</a>
  },
  {
    name: "Discord",
    content: <a href={Api.fockusty.discord_url} target="_blank">The Void</a>
  }
];

export const SKILLS: SkillCategory[] = [
  {
    id: "Frontend",
    title: <h3>Frontend</h3>,
    items: [
      <a key={"Frontend-1"} href="https://nextra.site/" target="_blank" rel="noopener noreferrer">Nextra</a>,
      <a key={"Frontend-2"} href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>,
      <a key={"Frontend-3"} href="https://react.dev/" target="_blank" rel="noopener noreferrer">React.js</a>,
      <a key={"Frontend-4"} href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML</a>,
      <a key={"Frontend-5"} href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS</a>
    ]
  },
  {
    id: "Backend",
    title: <h3>Backend</h3>,
    items: [
      <a key={"Backend-1"} href="https://www.passportjs.org/" target="_blank" rel="noopener noreferrer">Passport.js</a>,
      <a key={"Backend-2"} href="https://nestjs.com/" target="_blank" rel="noopener noreferrer">Nest.js</a>,
      <a key={"Backend-3"} href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express.js</a>,
      <a key={"Backend-4"} href="https://www.redhat.com/en/topics/api/what-is-a-rest-api" target="_blank" rel="noopener noreferrer">REST API</a>,
      <a key={"Backend-5"} href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" rel="noopener noreferrer">Websocket</a>,
      <a key={"Backend-6"} href="https://socket.io/docs/v4/" target="_blank" rel="noopener noreferrer">Socket.io</a>
    ]
  },
  {
    id: "Общее",
    title: <h3>Общее</h3>,
    items: [
      <a key={"Общее-1"} href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a>,
      <a key={"Общее-2"} href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions" target="_blank" rel="noopener noreferrer">Регулярные выражения (MDN)</a>,
      <a key={"Общее-3"} href="https://regex101.com" target="_blank" rel="noopener noreferrer">RegExp101 (Интерактивный тренажёр)</a>,
      <a key={"Общее-4"} href="https://mochajs.org" target="_blank" rel="noopener noreferrer">Mocha.js</a>
    ]
  },
  {
    id: "Базы данных",
    title: <h3>Базы данных</h3>,
    items: [
      <a key={"Базы данных-1"} href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">MongoDB</a>,
      <a key={"Базы данных-2"} href="https://www.sqlite.org/index.html" target="_blank" rel="noopener noreferrer">SQLite</a>
    ]
  },
  {
    id: "Инструменты",
    title: <h3>Инструменты</h3>,
    items: [
      <a key={"Инструменты-1"} href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">Visual Studio Code</a>,
      <a key={"Инструменты-2"} href="https://visualstudio.microsoft.com/" target="_blank" rel="noopener noreferrer">Visual Studio</a>,
      <a key={"Инструменты-3"} href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer">Photoshop</a>,
      <a key={"Инструменты-4"} href="https://desktop.github.com/" target="_blank" rel="noopener noreferrer">GitHub Desktop</a>,
      <a key={"Инструменты-5"} href="https://about.gitlab.com/" target="_blank" rel="noopener noreferrer">GitLab</a>,
      <a key={"Инструменты-6"} href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>,
      <a key={"Инструменты-7"} href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a>,
      <a key={"Инструменты-8"} href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">Figma</a>,
      <a key={"Инструменты-9"} href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a>
    ]
  },
  {
    id: "Языки программирования",
    title: <h3>Языки программирования</h3>,
    items: [
      <a key={"Языки программирования-1"} href="https://javascript.info/" target="_blank" rel="noopener noreferrer">JavaScript</a>,
      <a key={"Языки программирования-2"} href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">TypeScript</a>,
      <a key={"Языки программирования-3"} href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer">Python</a>,
      <a key={"Языки программирования-4"} href="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/" target="_blank" rel="noopener noreferrer">C#</a>,
      <a key={"Языки программирования-5"} href="https://go.dev/learn/" target="_blank" rel="noopener noreferrer">GoLang</a>
    ]
  }
];

export const EXPERIENCE: {
  position: React.ReactNode,
  company: React.ReactNode,
  period: React.ReactNode,
  responsibilities: React.ReactNode[]
}[] = [
  {
    position: "CEO, Backend developer",
    company: "Lazy And Focused",
    period: "2024-now",
    responsibilities: [
      "Управление командой",
      "Ревью кода",
      <span>
        Разработка своей бэкенд-архитектуры
        <a href="https://github.com/Lazy-And-Focused/BAD-template" target="_blank" rel="noopener noreferrer"> BAD</a>
      </span>,
      "INDEV"
    ]
  },
];