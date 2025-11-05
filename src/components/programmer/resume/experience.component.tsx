import type { ExperienceEntry, Responsibility as ResponsibilityType } from "types/resume.types";
import { Link } from "@/components/link";

import styles from "../styles.module.css";

type PackageProps = { packages: string[] };
const PackageLinks = ({ packages }: PackageProps) => {
  return packages.map((name) => (
    <a
      key={name + packages.length}
      className={styles.data_list__item}
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  ));
};

type ExperienceItemProps = {
  experience: ExperienceEntry;
};

const Job = ({ experience }: ExperienceItemProps) => {
  if (!experience.company) {
    return <></>;
  }

  const period = experience.period
    ? `· ${experience.period}`
    : "";

  const company = experience.company.href
    ? <Link key={experience.company.name} href={experience.company.href} name={experience.company.name} />
    : experience.company.name;

  return (
    <p className={styles.job__company}>
      {company} {period}
    </p>
  )
}

type ResponsibilityProps = {
  responsibility: ResponsibilityType;
  isItem?: boolean;
};

const Responsibility = ({ responsibility, isItem }: ResponsibilityProps) => {
  const className = isItem
    ? styles.data_list__item
    : ""

  if (responsibility.type === "text") {
    return <span className={className}>{responsibility.text}</span>;
  }

  if (responsibility.type === "link") {
    const Child = () => <Link className={className} href={responsibility.href} name={responsibility.name} />
    const Parent = responsibility.label
      ? () => <span className={className}>{responsibility.label}: <Child/></span>
      : () => <Child/>;

    return <Parent/>;
  }

  if (responsibility.type === "packages") {
    return <PackageLinks packages={responsibility.packages}/>
  }

  if (responsibility.type === "group") {
    return <div className={className}>
      <span>{responsibility.title}</span>
      <div className={styles.data_list}>
        <ResponsibilityList responsibilities={responsibility.items} />
      </div>
    </div>;
  }

  return null;
}

const ResponsibilityList = ({ responsibilities }: { responsibilities: ResponsibilityType[] }) => {
  return (
    <>
      {responsibilities.map((item, index) => (
        <Responsibility key={index} responsibility={item} isItem={item.type !== "group"} />
      ))}
    </>
  );
};

const ExperienceItem = ({ experience: job }: ExperienceItemProps) => {
  return (
    <div className={styles.job}>
      <h4 className={styles.job__position}>{job.position}</h4>
      <Job experience={job} />
      
      <div className={styles.job__responsibilities}>
        <ResponsibilityList responsibilities={job.responsibilities} />
      </div>
    </div>
  )
}

type Props = {
  items: ExperienceEntry[]
}

export const Experience = ({ items }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <ExperienceItem key={index} experience={item} />
      ))}
    </>
  );
}