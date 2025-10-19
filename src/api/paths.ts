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
export type InfoType = (typeof INFO)[number];

export const ADDITONLA_INFO: Record<InfoType, string> = {
  info: "Основная информия о том, что я делаю",
  projects: "Мои проекты, которые я сделал за всё время",
  resume:
    "Моё резюме, например для работы или для того, чтобы рассказать кратко о себе",
};

export const GROUPS = ["photographer", "programmer"] as const;
export type GroupType = (typeof GROUPS)[number];

export const GROUPS_INFO: Record<
  GroupType,
  {
    post: string;
    covers: Record<InfoType, string>;
    descriptions: Record<InfoType, string>;
  } & Record<InfoType, string>
> = {
  photographer: {
    covers: {
      info: "/photographer.png",
      projects: "/photographer.png",
      resume: "/photographer.png",
    },
    post: "Фотограф-любитель",

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
  Group extends GroupType,
  Info extends InfoType,
>(
  group: Group,
  info: Info,
) => {
  return [`${PREFIX}/${group}/${info}`, `${Russian[info]}`] as const;
};

export const getPath = <Group extends GroupType, Info extends InfoType>(
  group: Group,
  info: Info,
) => {
  const [link, name] = getPathWithoutGroupPrefix(group, info);

  return [link, `${Russian[group]}/${name}`] as const;
};

export const getPaths = <Group extends GroupType>(group: Group) => {
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

export const PARAMS: Record<string, string|undefined> = {
  "gallery": "Галерея"
};

export const resolvePathName = (path: string, params: Record<string, string>) => {
  const defaultName = PATHS[path];
  if (defaultName) {
    return defaultName;
  }

  const keys = Object.keys(params);
  if (keys.length === 0) {
    return "404";
  }

  return keys.filter(key => PARAMS[key]).map(key => PARAMS[key]).join("/");
}