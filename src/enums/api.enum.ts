export const Api = {
  base: '/api',
  orders: '/api/orders',
  resume: '/resume',
  data: '/data',
} as const satisfies Readonly<Record<string, string>>;

export type ApiKeys = keyof typeof Api;
export type Api = (typeof Api)[ApiKeys];
