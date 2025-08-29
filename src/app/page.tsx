'use client'

import Link from "next/link";
import { useState } from "react";

import { GROUPS, Russian } from "@/api/paths";
import { useDropdown } from "@/components/dropdown";

import styles from "./page.module.css";
import { Group } from "@/components/paths";

const Page = () => {
  const [ currentGroup, setCurrentGroup ] = useState<(typeof GROUPS)[number]>("programmer");
  const { Dropdown, setActived } = useDropdown({ id: "hobbies", className: styles.dropdown });

  return (
    <div
      className="page-center"
      style={{
        justifySelf: "center",
        gap: "10px"
      }}
    >
      <Dropdown
        summary={<button>(Выберите хобби)</button>}
      >
        {
          GROUPS.filter(group => group !== currentGroup).map(group => (
            <button
              key={"btn" + group}
              onClick={() => {
                setCurrentGroup(group);
                setActived(false);
              }}
            >{group}</button>
          ))
        }
      </Dropdown>

      <div className={styles.group} key={currentGroup}>
        <h2>{Russian[currentGroup]}:</h2>
        <div className={styles.links}>
          <Link href={"/introduction"}>Вступление</Link>
          <Group group={currentGroup}/>
        </div>
      </div>
    </div>
  )
};

export default Page;
