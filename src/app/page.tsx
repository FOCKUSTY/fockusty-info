"use client";

import type { ReactNode } from "react";

import { useEffect, useRef, useState } from "react";

import {
  ChooseGroupComponent,
  GroupsComponent,
} from "@/components/groups.component";
import { Dropdown } from "@/components/dropdown";
import { Link as MyLink } from "@/components/link";

import { INFO, NICKNAME } from "./page.constants";

import { formatAge, formatedAgeToString, getFullAge } from "@/api/date.api";
import { GROUPS, GROUPS_INFO, Russian } from "@/api/paths";
import { Api } from "@/api";

import Image from "next/image";

import styles from "./page.module.css";

const Layout = ({
  children,
  currentGroup,
}: {
  children: ReactNode;
  currentGroup: (typeof GROUPS)[number];
}) => {
  return (
    <>
      <div
        className={"page-center " + styles.page_center}
        style={{
          justifySelf: "center",
          gap: "10px",
        }}
      >
        <div className={[styles.short_info, "noselect"].join(" ")}>
          <div className={styles.short_info__name}>
            <h3>FOCKUSTY</h3>
            <h4>{GROUPS_INFO[currentGroup].post}</h4>
          </div>
          <Image
            src="/AVATAR--fockusty-2--style-meow.png"
            height={128}
            width={128}
            alt="fockusty avatar"
          />
        </div>

        {children}
      </div>

      <div className={styles.fockusty}>
        <h2 id="im">Я как человек</h2>
        <p>
          На самом деле я являюсь очень интересной личностью, например в своём{" "}
          <MyLink href={Api.the_void.telegram_url} name="Telegram канале" /> я
          каждый день пишу что-нибудь, общаюсь в чате и люблю писать рецензии на
          некоторые видео и не только! Кстати! Этот сайт я написал полностью сам
          (хотя иногда и спрашивал совета у своего друга{" "}
          <MyLink href="https://lanvalird.ru" name="Валентина (клик)" />)
        </p>
        <p>
          Вообще, если быть честным, то я не самый нормальный человек, который
          вообще существует на этой планете могу сказать, что я очень странный,
          ведь меня не всегда понимают люди, да и я людей не всегда-то понимаю
          впрочем интересно получается даже
        </p>
        <p>
          Также я бывают довольно депрессивным в некоторое время, особенно если
          мне долго не дают побыть в одиночестве если такое случается, то я
          становлюсь слишком депрессивным и уставшим, также меня начинают
          раздражать люди ещё больше
        </p>
        <p>
          Несмотря на всё выше перечисленное, я вообще душка и милашка, потому
          что кажусь себе добрым, да и другим тоже. Раньше я отнекивался от
          этого, однако со временем я и сам начал себя называть добрым, вот так
          вот, хотя, если быть честным, то на самом деле я считаю себе злым,
          угрюмым, уродливым, страшным, ненавистным и все другие оскорбления,
          которые вы только можете придумать :)
        </p>
      </div>
    </>
  );
};

const Page = () => {
  const [currentGroup, setCurrentGroup] =
    useState<(typeof GROUPS)[number]>("programmer");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [mainInterval, setMainInterval] = useState<NodeJS.Timeout | null>(null);

  const dropdownContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainInterval) {
      clearInterval(mainInterval);
    }

    const interval = setInterval(() => {
      setDate(new Date());
    }, 100);

    if (!mainInterval) {
      setMainInterval(interval);
    }
    setLoaded(true);

    return () => {
      if (mainInterval) {
        clearInterval(mainInterval);
      }

      clearInterval(interval);
    };
  }, []);

  if (!loaded) {
    return (
      <Layout currentGroup={currentGroup}>
        <div className={styles.info}>
          <h2 className={styles.text}>
            Привет! Я {NICKNAME}, и я {Russian[currentGroup].toLowerCase()}
          </h2>
          <div>{INFO[currentGroup]}</div>
        </div>
      </Layout>
    );
  }

  const onIntervalClick = () => {
    if (!mainInterval) {
      return setMainInterval(
        setInterval(() => {
          setDate(new Date());
        }, 100),
      );
    }

    setMainInterval((previous) => {
      if (previous) {
        clearInterval(previous);
      }

      return null;
    });
  };

  return (
    <Layout currentGroup={currentGroup}>
      <div className={styles.main_info}>
        <div className={styles.info}>
          <h2
            className={[styles.text, styles.info__text__h2].join(" ")}
            onClick={onIntervalClick}
          >
            Мне уже {formatedAgeToString(formatAge(getFullAge(date)))}!
          </h2>

          <h2 className={styles.text}>
            Привет! Я {NICKNAME}, и я
            <Dropdown
              ref={dropdownContent}
              className={styles.dropdown}
              summary={
                <button>
                  <h3>{Russian[currentGroup].toLowerCase()}</h3>
                </button>
              }
            >
              <ChooseGroupComponent
                group={currentGroup}
                ref={dropdownContent}
                set={setCurrentGroup}
              />
            </Dropdown>
          </h2>
        </div>

        <div className={styles.group_info}>{INFO[currentGroup]}</div>
      </div>

      <div className={styles.groups}>
        <GroupsComponent
          group={currentGroup}
          className={styles.group_data__box}
          imageClassName={styles.group_data__image}
          linkClassName={styles.group_data}
        />
      </div>
    </Layout>
  );
};

export default Page;
