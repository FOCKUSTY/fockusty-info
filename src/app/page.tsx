'use client'

import styles from "./page.module.css";
import { Items } from "components/items.component";

const Page = () => {
  return (
    <>
      <div className="page-center">
        <Items className={styles.animation} />
      </div>
    </>
  )
};

export default Page;
