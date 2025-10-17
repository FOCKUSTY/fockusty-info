export enum Russian {
  "me" = "Я",

  "photographer" = "Фотограф",
  "programmer" = "Программист",

  "projects" = "Проекты",
  "resume" = "Резюме",
  "info" = "Информация",

  "Проекты" = "projects",
  "Резюме" = "resume",
  "Информация" = "info",
}

export const PREFIX = "/me" as const;

export const INFO = ["projects", "resume", "info"] as const;

export const ADDITONLA_INFO: Record<(typeof INFO)[number], string> = {
  info: "Основная информия о том, что я делаю",
  projects: "Мои проекты, которые я сделал за всё время",
  resume:
    "Моё резюме, например для работы или для того, чтобы рассказать кратко о себе",
};

export const GROUPS = ["photographer", "programmer"] as const;

export const GROUPS_INFO: Record<
  (typeof GROUPS)[number],
  {
    post: string;
    covers: Record<(typeof INFO)[number], string>;
    descriptions: Record<(typeof INFO)[number], string>;
  } & Record<(typeof INFO)[number], string>
> = {
  photographer: {
    covers: {
      info: "/photographer.png",
      projects: "/photographer.png",
      resume: "/photographer.png",
    },
    post: "Начинающий фотограф-любитель",

    descriptions: {
      ...ADDITONLA_INFO,
      projects: "Моя галерея фотографий :>",
    },

    info: Russian.info,
    projects: "Галерея",
    resume: Russian.resume,
  },

  programmer: {
    covers: {
      info: "/programmer.png",
      projects: "/programmer.png",
      resume: "/programmer.png",
    },
    post: "Backend-программист",

    descriptions: ADDITONLA_INFO,

    info: Russian.info,
    projects: Russian.projects,
    resume: Russian.resume,
  },
};

export const getPathWithoutGroupPrefix = <
  Group extends (typeof GROUPS)[number],
  Info extends (typeof INFO)[number],
>(
  group: Group,
  info: Info,
) => {
  return [`${PREFIX}/${group}/${info}`, `${Russian[info]}`] as const;
};

export const getPath = <
  Group extends (typeof GROUPS)[number],
  Info extends (typeof INFO)[number],
>(
  group: Group,
  info: Info,
) => {
  const [link, name] = getPathWithoutGroupPrefix(group, info);

  return [link, `${Russian[group]}/${name}`] as const;
};

export const getPaths = <Group extends (typeof GROUPS)[number]>(
  group: Group,
) => {
  return INFO.map((info) => getPath(group, info));
};

export const PATHS: { [key: string]: string | undefined } = {
  "/": "Главная",
  "/introduction": "Вступление",

  "/me/socials": "Мои соцсети",
  "/me/info": "Моя информация",

  ...Object.fromEntries(
    GROUPS.flatMap((group) => INFO.map((info) => getPath(group, info))),
  ),
};
