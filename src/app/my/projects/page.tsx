'use client'

import type { Project } from '@/types/project.types';

import React, { useEffect, useState } from 'react';

import { getRepositories } from '@/services/get-repositories';

import styles from './styles.module.css';
import { ProjectComponent } from '@/components/project.component';

const sortToKey: Record<"stars"|"date"|"forks"|"name", keyof Project> = {
  stars: "stargazers_count",
  date: "updated_at",
  forks: "forks_count",
  name: "name"
};

const Page = () => {
  const [ projects, setProjects ] = useState<Project[]>([]);
  const [ sorting, setSorting ] = useState<"stars"|"date"|"forks"|"name">("date");

  useEffect(() => {
    (async () => {
      setProjects(await getRepositories() || []);
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
            { sorting === "name" ? <></> : <button onClick={() => setSorting("name")}>Имя</button>}
            { sorting === "date" ? <></> : <button onClick={() => setSorting("date")}>Дата</button>}
            { sorting === "forks" ? <></> : <button onClick={() => setSorting("forks")}>Форки</button>}
            { sorting === "stars" ? <></> : <button onClick={() => setSorting("stars")}>Звезды</button>}
          </div>
        </div>
        
        <div className={styles.projectsFlex}>
          {
            projects.sort((p1, p2) => {
              const [ v1, v2 ] = [p1[sortToKey[sorting]], p2[sortToKey[sorting]]];

              if (v1 === null || v2 === null) {
                return 0;
              }

              if (sorting === "name") {
                return p1.name.localeCompare(p2.name);
              } else if (sorting === "date") {
                return new Date(v2.toString()).getTime() - new Date(v1.toString()).getTime();
              } else {
                const output = +v2 - +v1;

                return output === 0
                  ? p1.name.localeCompare(p2.name)
                  : output;
              }
            }).map((project) => <ProjectComponent key={project.id} project={project} styles={styles} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
