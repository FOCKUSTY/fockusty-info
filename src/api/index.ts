export class Api {
  public static readonly the_void = {
    github_url: "https://github.com/The-Void-Community",
    discord_url: "https://discord.gg/97J8mnn4Gr",
    telegram_url: "https://t.me/The_Void_Community",
    site: "https://fockusty.netlify.app"
  } as const;

  public static readonly fockusty = {
    github_url: "https://github.com/FOCKUSTY",
    discord_url: "https://discord.gg/97J8mnn4Gr",
    telegram_url: "https://t.me/fockusty",
    site: "https://fockusty.netlify.app"
  } as const;

  public static random = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };
}