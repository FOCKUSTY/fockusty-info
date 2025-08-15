import React from 'react';

import {
  PERSONAL_INFO,
  CONTACT_INFO,
  SKILLS,
  EXPERIENCE,
  SkillCategory
} from './constants';

import styles from './styles.module.css';

const Page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.resumeContainer}>
        <div className={styles.resumeHeader}>
          <h1>{PERSONAL_INFO.name}</h1>
          <p>{PERSONAL_INFO.position}</p>
        </div>
        
        <div className={styles.resumeContent}>
          <section className={styles.resumeSection}>
            <h2>Контактная информация</h2>
            <ul className={styles.contactList}>
              {CONTACT_INFO.map((info, index) => (
                <li key={info.name + index}><span>{info.name}:</span> {info.content}</li>
              ))}
            </ul>
          </section>
          
          <section className={styles.resumeSection}>
            <h2>Навыки</h2>
            <div className={styles.skillsGrid}>
              {SKILLS.map((category: SkillCategory) => (
                <div key={category.id} className={styles.skillCategory}>
                  {category.title}
                  <ul>
                    {category.items.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          
          <section className={styles.resumeSection}>
            <h2>Опыт работы</h2>
            <div className={styles.experienceList}>
              {EXPERIENCE.map((job, index) => (
                <div key={index} className={styles.job}>
                  <h3>{job.position}</h3>
                  <p className={styles.company}>{job.company} · {job.period}</p>
                  <ul className={styles.responsibilities}>
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;