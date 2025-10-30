"use client";

import type { ReactNode } from "react";

import { PERSONAL_INFO, CONTACT_INFO, SKILLS, EXPERIENCE } from "./constants";

import styles from "./styles.module.css";
import PageCenter from "@/components/layout/page-center";

type ContentProps = {
  summary: ReactNode;
  children: ReactNode;
  contentClassName?: string;
};

const Content = ({ children, summary, contentClassName }: ContentProps) => {
  return (
    <section className={styles.content}>
      <h3 className={styles.content__summary}>{summary}</h3>
      <div className={`${contentClassName} ${styles.content__children}`}>
        {children}
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <PageCenter>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className={styles.header__name}>{PERSONAL_INFO.name}</h2>
          <p className={styles.header__position}>{PERSONAL_INFO.position}</p>
        </div>

        <div className={styles.container}>
          <Content summary="Контактная информация">
            {CONTACT_INFO.map((info, index) => (
              <span key={info.name + index}>
                {info.name}: {info.content}
              </span>
            ))}
          </Content>

          <hr />

          <Content contentClassName={styles.content__skils} summary="Навыки">
            {SKILLS.map((category) => (
              <div key={category.id} className={styles.skills}>
                <span className={styles.skills__title}>{category.title}</span>
                <div
                  className={`${styles.skills__content} ${styles.data_list}`}
                >
                  {category.items.map((skill, index) => (
                    <span className={styles.data_list__item} key={index}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Content>

          <hr />

          <Content contentClassName={styles.content__job} summary="Опыт">
            {EXPERIENCE.map((job, index) => (
              <div key={index} className={styles.job}>
                <h4 className={styles.job__position}>{job.position}</h4>
                {job.company ? (
                  <p className={styles.job__company}>
                    {job.company} {job.period ? <>· {job.period}</> : <></>}
                  </p>
                ) : (
                  <></>
                )}
                <div className={styles.job__responsibilities}>
                  {job.responsibilities.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </Content>
        </div>
      </div>
    </PageCenter>
  );
};

export default Page;
