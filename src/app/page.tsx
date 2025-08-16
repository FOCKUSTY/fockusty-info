'use client'

import Link from "next/link";

import styles from "./page.module.css";

const Page = () => {
  return (
    <>
      <div className="page-center" style={{justifySelf: "center"}}>
        <div className={styles.animation} id="animation">
          <Link href={"/introduction"}>Вступление</Link>
          <Link href={"/my/projects"}>Мои проекты</Link>
          <Link href={"/my/socials"}>Мои соцсети</Link>
          <Link href={"/me/info"}>Немного обо мне</Link>
          <Link href={"/me/resume"}>Резюме</Link>
        </div>
      </div>
    </>
  )
};

export default Page;
