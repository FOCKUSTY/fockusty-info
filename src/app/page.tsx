'use client'

import Link from "next/link";
import { useState } from "react";

import { getPathWithoutGroupPrefix, GROUPS, INFO, Russian } from "@/api/paths";
import { Dropdown } from "@/components/dropdown";

import styles from "./page.module.css";

const InfoLink = ({
  group,
  info
}: {
  group: (typeof GROUPS)[number],
  info: (typeof INFO)[number]
}) => {
  const [ link, name ] = getPathWithoutGroupPrefix(group, info)
  return <Link key={link + name} href={link}>{name}</Link>
}

const Group = ({
  group
}: {
  group: (typeof GROUPS)[number]
}) => {
  return INFO.map(info => <InfoLink key={group + info} group={group} info={info} />);
}

const Page = () => {
  const [ currentGroup, setCurrentGroup ] = useState<(typeof GROUPS)[number]>("programmer");

  return (
    <div
      className="page-center"
      style={{
        justifySelf: "center",
        gap: "10px"
      }}
    >
      <Dropdown
        id="hobbies"
        summary={<button>(Выберите хобби)</button>}
        className={styles.dropdown}
      >
        {
          GROUPS.filter(group => group !== currentGroup).map(group => (
            <button key={"btn" + group} onClick={() => setCurrentGroup(group)}>{group}</button>
          ))
        }
      </Dropdown>

      {
        <div className={styles.group} key={currentGroup}>
          <h2>{Russian[currentGroup]}:</h2>
          <div className={styles.links}>
            <Group group={currentGroup}/>
          </div>
        </div>
      }
    </div>
  )
};

export default Page;
