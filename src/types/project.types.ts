export interface Project {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  is_template: boolean;
}
