export type ContactItem = {
  name: string;
  href: string;
  label: string;
};

export type SkillItem = {
  name: string;
  href?: string;
};

export type SkillCategoryData = {
  id: string;
  title: string;
  items: SkillItem[];
};

export type LinkItem = { name: string; href?: string };
export type ResponsibilityLink = {
  type: "link";
  label?: string;
} & Required<LinkItem>;

export type Responsibility =
  | { type: "text"; text: string }
  | { type: "packages"; packages: string[] }
  | { type: "group"; title?: string; items: Array<Responsibility> }
  | ResponsibilityLink;

export type ExperienceEntry = {
  position: string;
  company?: { name: string; href?: string };
  period?: string;
  responsibilities: Responsibility[];
};
