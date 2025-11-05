export const LAYOUT_CONSTANTS = {
  paths: {
    "/": "Главная",
    "/introduction": "Вступление",
    "/me/socials": "Мои соцсети",
    "/me/info": "Информация обо мне",
  },
} as const;

export const PATHS_MAP: Record<string, string> = LAYOUT_CONSTANTS.paths;

export default LAYOUT_CONSTANTS;
