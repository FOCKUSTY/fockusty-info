export interface Settings {
  title: string;
  date: string;
  name: string;

  description?: string;
}

export interface JsonPhoto {
  categories: string[];
  location: string;
  position?: string;
  camera?: string;
  unique?: boolean
}

export type JsonCategories = Record<string, string[]>;

export type Photo = Required<Settings & JsonPhoto>;
