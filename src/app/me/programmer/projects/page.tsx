"use client";

import type { Project } from "@/types/project.types";

import { useEffect, useState } from "react";

import { getRepositories } from "@/services/get-repositories";
import { ProjectComponent } from "@/components/project.component";

import styles from "./styles.module.css";

type SortingType = "stars" | "date" | "forks" | "name";

const sortToKey: Record<SortingType, keyof Project> = {
  stars: "stargazers_count",
  date: "updated_at",
  forks: "forks_count",
  name: "name",
};

const russian: Record<string, string> = {
  name: "Имя",
  date: "Дата",
  forks: "Форки",
  stars: "Звезды",
};

const sort = ({ p1, p2, sorting }: { p1: Project; p2: Project; sorting: SortingType }) => {
  const [v1, v2] = [p1[sortToKey[sorting]], p2[sortToKey[sorting]]];

  if (v1 === null || v2 === null) {
    return 0;
  }

  if (sorting === "name") {
    return p1.name.localeCompare(p2.name);
  } else if (sorting === "date") {
    return new Date(v2.toString()).getTime() - new Date(v1.toString()).getTime();
  } else {
    const output = +v2 - +v1;

    return output === 0 ? p1.name.localeCompare(p2.name) : output;
  }
};

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sorting, setSorting] = useState<SortingType>("date");

  useEffect(() => {
    (async () => {
      setProjects((await getRepositories()) || []);
    })();
  }, []);

  if (!projects) {
    return <></>;
  }

  return (
    <div className="page-center">
      <div className={styles.projectsContainer}>
        <div className={styles.sort}>
          <span>Сортировать по:</span>
          <div className={styles.sort_by}>
            {Object.keys(russian).map((key) => {
              if (sorting === key) {
                return null;
              }

              return (
                <button key={key} onClick={() => setSorting(key as SortingType)}>
                  {russian[key]}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.projectsFlex}>
          {projects
            .sort((p1, p2) => sort({ p1, p2, sorting }))
            .map((project) => (
              <ProjectComponent key={project.id} project={project} styles={styles} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
