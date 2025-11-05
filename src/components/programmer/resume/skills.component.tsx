import type { SkillCategoryData } from "types/resume.types";

import styles from "../styles.module.css";

type SkillProps = {
  category: SkillCategoryData;
};

export const Skill = ({ category }: SkillProps) => {
  return (
    <div key={category.id} className={styles.skills}>
      <span className={styles.skills__title}>{category.title}</span>
      <div className={`${styles.skills__content} ${styles.data_list}`}>
        {category.items.map((skill, index) => (
          <span className={styles.data_list__item} key={index}>
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

type Props = {
  items: SkillCategoryData[];
};

export const Skills = ({ items }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <Skill key={index} category={item} />
      ))}
    </>
  );
};
