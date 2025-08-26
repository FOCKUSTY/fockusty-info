export interface Settings {
  title: string;
  date: string;
  
  description?: string;
  location?: string;
  camera?: string;
}

export type Photo = Required<Settings> & {
  category: string,
  name: string,
  position: string
}