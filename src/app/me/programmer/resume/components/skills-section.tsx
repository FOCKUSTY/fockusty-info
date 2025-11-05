"use client";

import React from "react";
import type { SkillCategoryData, SkillItem } from "../constants";
import styles from "../styles.module.css";
import { Link as MyLink } from "@/components/link";

export const SkillsSection = ({ categories }: { categories: SkillCategoryData[] }) => {
  return (
    <div className={styles.skills_list}>
      {categories.map((category: SkillCategoryData) => (
        <div key={category.id} className={styles.skills}>
          <span className={styles.skills__title}>{category.title}</span>
          <div className={`${styles.skills__content} ${styles.data_list}`}>
            {category.items.map((skillItem: SkillItem, skillIndex: number) => (
              <span className={styles.data_list__item} key={`${category.id}-${skillIndex}`}>
                {skillItem.href ? <MyLink href={skillItem.href} name={skillItem.name} /> : skillItem.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
