"use client";

import React from "react";
import type { SkillCategoryData } from "../constants";
import styles from "../styles.module.css";
import { Link as MyLink } from "@/components/link";

export const SkillsSection = ({ categories }: { categories: any }) => {
  return (
    <div className={styles.skills_list}>
      {categories.map((cat: any) => (
        <div key={cat.id} className={styles.skills}>
          <span className={styles.skills__title}>{cat.title}</span>
          <div className={`${styles.skills__content} ${styles.data_list}`}>
            {cat.items.map((it: any, idx: number) => (
              <span className={styles.data_list__item} key={cat.id + idx}>
                {it.href ? <MyLink href={it.href} name={it.name} /> : it.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
