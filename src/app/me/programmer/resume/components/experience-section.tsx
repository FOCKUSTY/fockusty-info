"use client";

import React from "react";
import type { ExperienceEntry, Responsibility } from "../constants";
import styles from "../styles.module.css";
import { Link as MyLink } from "@/components/link";

const renderResponsibility = (r: Responsibility, key: string | number) => {
  if ((r as any).type === "text") {
    return <span key={key}>{(r as any).text}</span>;
  }

  if ((r as any).type === "packages") {
    const pk = (r as any).packages as string[];
    return (
      <div key={key} className={styles.data_list}>
        {pk.map((p) => (
          <a key={p} className={styles.data_list__item} href={`https://www.npmjs.com/package/${p}`} target="_blank" rel="noopener noreferrer">
            {p}
          </a>
        ))}
      </div>
    );
  }

  if ((r as any).type === "group") {
    const g = r as any;
    return (
      <div key={key} style={{ display: "flex", flexDirection: "column", gap: "7.5px" }}>
        {g.title ? <span>{g.title}</span> : null}
        <div className={styles.data_list}>
          {g.items.map((it: any, idx: number) => {
            if (typeof it === "string") return <span key={idx}>{it}</span>;
            if ((it as any).type === "text") return <span key={idx}>{(it as any).text}</span>;
            if ((it as any).type === "packages")
              return (it as any).packages.map((p: string) => (
                <a key={p} className={styles.data_list__item} href={`https://www.npmjs.com/package/${p}`} target="_blank" rel="noopener noreferrer">
                  {p}
                </a>
              ));
            if ((it as any).href) return <MyLink key={idx} href={(it as any).href} name={(it as any).name} className={styles.data_list__item} />;

            return null;
          })}
        </div>
      </div>
    );
  }

  // link-like
  if ((r as any).href) {
    return <MyLink key={key} href={(r as any).href} name={(r as any).name} />;
  }

  return null;
};

export const ExperienceSection = ({ entries }: { entries: any }) => {
  return (
    <div className={styles.experience_list}>
      {entries.map((job: any, idx: number) => (
        <div key={idx} className={styles.job}>
          <h4 className={styles.job__position}>{job.position}</h4>
          {job.company ? (
            <p className={styles.job__company}>
              {typeof job.company === "string" ? (
                job.company
              ) : (
                <a href={(job.company as any).href} target="_blank" rel="noopener noreferrer">
                  {(job.company as any).name}
                </a>
              )}{" "}
              {job.period ? <>· {job.period}</> : null}
            </p>
          ) : null}

          <div className={styles.job__responsibilities}>
            {job.responsibilities.map((r: any, i: number) => (
              <div key={i}>{renderResponsibility(r, i)}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
