export const Jsons = {
  resumes: "resumes.json",
  orders: "orders.json"
} as const satisfies Record<string, string>;

export type Jsons = (typeof Jsons)[keyof typeof Jsons];
