"use client";

import type { ReactNode } from "react";

import { PERSONAL_INFO, CONTACT_INFO, SKILLS, EXPERIENCE } from "./constants";
import ContactSection from "./components/contact-section";
import SkillsSection from "./components/skills-section";
import ExperienceSection from "./components/experience-section";

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
            <ContactSection items={CONTACT_INFO} />
          </Content>

          <hr />

          <Content contentClassName={styles.content__skils} summary="Навыки">
            <SkillsSection categories={SKILLS} />
          </Content>

          <hr />

          <Content contentClassName={styles.content__job} summary="Опыт">
            <ExperienceSection entries={EXPERIENCE} />
          </Content>
        </div>
      </div>
    </PageCenter>
  );
};

export default Page;
