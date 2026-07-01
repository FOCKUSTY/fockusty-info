export const Pages = {
  resume: 'resume',
  order: 'order',
  home: '',
  notfound: '**',
} as const satisfies Record<string, string>;

export type PagesKeys = keyof typeof Pages;
export type Pages = (typeof Pages)[PagesKeys];
