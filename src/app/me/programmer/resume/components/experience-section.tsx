"use client";

import React from "react";
import type { ExperienceEntry, Responsibility } from "../constants";
import styles from "../styles.module.css";
import { Link as MyLink } from "@/components/link";

function hasTypeField(value: unknown): value is { type: unknown } {
  return !!value && typeof value === "object" && Object.prototype.hasOwnProperty.call(value, "type");
}

function isTextResponsibility(responsibility: Responsibility): responsibility is { type: "text"; text: string } {
  return hasTypeField(responsibility) && (responsibility as any).type === "text";
}

function isPackagesResponsibility(responsibility: Responsibility): responsibility is { type: "packages"; packages: string[] } {
  return hasTypeField(responsibility) && (responsibility as any).type === "packages";
}

function isGroupResponsibility(responsibility: Responsibility): responsibility is { type: "group"; title?: string; items: any[] } {
  return hasTypeField(responsibility) && (responsibility as any).type === "group";
}

const renderResponsibility = (responsibility: Responsibility, key: string | number) => {
  if (isTextResponsibility(responsibility)) {
    return <span key={key}>{responsibility.text}</span>;
  }

  if (isPackagesResponsibility(responsibility)) {
    const packageNames = responsibility.packages;
    return (
      <div key={key} className={styles.data_list}>
        {packageNames.map((packageName) => (
          <a key={packageName} className={styles.data_list__item} href={`https://www.npmjs.com/package/${packageName}`} target="_blank" rel="noopener noreferrer">
            {packageName}
          </a>
        ))}
      </div>
    );
  }

  if (isGroupResponsibility(responsibility)) {
    const group = responsibility as any;
    return (
      <div key={key} style={{ display: "flex", flexDirection: "column", gap: "7.5px" }}>
        {group.title ? <span>{group.title}</span> : null}
        <div className={styles.data_list}>
          {group.items.map((groupItem: any, groupItemIndex: number) => {
            if (typeof groupItem === "string") return <span key={groupItemIndex}>{groupItem}</span>;
            if (hasTypeField(groupItem) && (groupItem as any).type === "text") return <span key={groupItemIndex}>{(groupItem as any).text}</span>;
            if (hasTypeField(groupItem) && (groupItem as any).type === "packages")
              return (groupItem as any).packages.map((packageName: string) => (
                <a key={packageName} className={styles.data_list__item} href={`https://www.npmjs.com/package/${packageName}`} target="_blank" rel="noopener noreferrer">
                  {packageName}
                </a>
              ));
            if ((groupItem as any).href) return <MyLink key={groupItemIndex} href={(groupItem as any).href} name={(groupItem as any).name} className={styles.data_list__item} />;

            return null;
          })}
        </div>
      </div>
    );
  }

  // link-like object without 'type' field
  if ((responsibility as any).href) {
    return <MyLink key={key} href={(responsibility as any).href} name={(responsibility as any).name} />;
  }

  return null;
};

export const ExperienceSection = ({ entries }: { entries: ExperienceEntry[] }) => {
  return (
    <div className={styles.experience_list}>
      {entries.map((job: ExperienceEntry, jobIndex: number) => (
        <div key={jobIndex} className={styles.job}>
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
            {job.responsibilities.map((responsibility: Responsibility, responsibilityIndex: number) => (
              <div key={responsibilityIndex}>{renderResponsibility(responsibility, responsibilityIndex)}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
