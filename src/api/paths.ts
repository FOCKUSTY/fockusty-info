export enum Russian {
  "me"="Я",
  
  "photographer"="Фотограф",
  "programmer"="Программист",

  "projects"="Проекты",
  "resume"="Резюме",
  "info"="Информация",
}

export const PREFIX = "/me" as const;

export const INFO = [
  "projects",
  "resume",
  "info"
] as const;

export const GROUPS = [
  "photographer",
  "programmer"
] as const;

export const getPathWithoutGroupPrefix = <
  Group extends (typeof GROUPS)[number],
  Info extends (typeof INFO)[number]
>(group: Group, info: Info) => {
  return [`${PREFIX}/${group}/${info}`, `${Russian[info]}`] as const
}

export const getPath = <
  Group extends (typeof GROUPS)[number],
  Info extends (typeof INFO)[number]
>(group: Group, info: Info) => {
  const [ link, name ] = getPathWithoutGroupPrefix(group, info);

  return [link, `${Russian[group]}/${name}`] as const
}

export const getPaths = <
  Group extends (typeof GROUPS)[number] 
>(group: Group) => {
  return INFO.map(info => getPath(group, info));
}

export const PATHS: { [key: string]: string|undefined } = {
  "/": "Главная",
  "/introduction": "Вступление",
  
  "/me/socials": "Мои соцсети",
  "/me/info": "Моя информация",
  
  ...Object.fromEntries(
    GROUPS.flatMap(group => (
      INFO.map(info => getPath(group, info))
    ))
  )
}