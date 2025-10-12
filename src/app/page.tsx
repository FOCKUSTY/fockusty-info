'use client'

import { useEffect, useRef, useState } from "react";

import { Dropdown } from "@/components/dropdown";
import { GroupData } from "@/components/paths";
import { Link as MyLink } from "@/components/link"

import { INFO, NICKNAME, DATE_OF_BIRTH } from "./page.constants";

import { ADDITONLA_INFO, GROUPS, Russian } from "@/api/paths";
import { ruWords } from "@/api/russian";

import Image from "next/image";
import Link from "next/link";


import styles from "./page.module.css";
import { Api } from "@/api";

const dateOfBirth = new Date(DATE_OF_BIRTH.year, DATE_OF_BIRTH.month, DATE_OF_BIRTH.day, DATE_OF_BIRTH.hours, 0, 0);

const SECONDS = 1000;

const MINUTE = 60;
const toMinutes = MINUTE;

const HOUR  = 60;
const toHours = toMinutes * HOUR;

const DAY = 24;
const toDay = toHours * DAY

const MONTH = 31;

const YEAR = 365;
const LEAP_YEAR = 4;
const toYear = toDay * YEAR;

const getFullYear = (now: Date) => {
  const timestamp = (now.getTime() - dateOfBirth.getTime()) / SECONDS;

  const years = Math.floor(timestamp / toYear);
  const days = Math.floor(timestamp / toDay - (years * YEAR) - (years / LEAP_YEAR));
  const months = Math.floor(days / MONTH);
  const hours = Math.floor(timestamp / toHours) - (Math.floor(timestamp / toDay) * DAY);
  const minutes = Math.floor(timestamp / toMinutes) - (Math.floor(timestamp / toHours) * HOUR);
  const seconds = Math.floor((timestamp - (Math.floor(timestamp / toMinutes) * MINUTE)) * 10) / 10;

  return {
    years,
    months,
    days: days - (months * 31),
    hours,
    minutes,
    seconds
  };
};

const Layout = ({
  children,
  currentGroup
}: {
  children: React.ReactNode,
  currentGroup: (typeof GROUPS)[number]
}) => {
  return (
    <>
      <div
        className={"page-center " + styles.page_center}
        style={{
          justifySelf: "center",
          gap: "10px"
        }}
      >
        <div
          className={[styles.short_info, "noselect"].join(" ")}
        >
          <div className={styles.short_info__name}>
            <h3>FOCKUSTY</h3>
            <h4>
              {
                currentGroup === "programmer"
                  ? "Backend-разработчик"
                  : "Начинающий фотограф"
              }
            </h4>
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
          На самом деле я являюсь очень интересной личностью, например в своём <MyLink href={Api.the_void.telegram_url} name="Telegram канале" /> я
          каждый день пишу что-нибудь, общаюсь в чате и люблю писать рецензии на некоторые видео и не только!
          Кстати! Этот сайт я написал полностью сам (хотя иногда и спрашивал совета у своего друга <MyLink href="https://lanvalird.ru" name="Валентина (клик)" />)
        </p>
        <p>
          Вообще, если быть честным, то я не самый нормальный человек, который вообще существует на этой планете
          могу сказать, что я очень странный, ведь меня не всегда понимают люди, да и я людей не всегда-то понимаю
          впрочем интересно получается даже
        </p>
        <p>
          Также я бывают довольно депрессивным в некоторое время, особенно если мне долго не дают побыть в одиночестве
          если такое случается, то я становлюсь слишком депрессивным и уставшим, также меня начинают раздражать люди ещё больше
        </p>
        <p>
          Несмотря на всё выше перечисленное, я вообще душка и милашка, потому что кажусь себе добрым, да и другим тоже. Раньше
          я отнекивался от этого, однако со временем я и сам начал себя называть добрым, вот так вот,
          хотя, если быть честным, то на самом деле я считаю себе злым, угрюмым, уродливым, страшным, ненавистным и
          все другие оскорбления, которые вы только можете придумать :)
        </p>
      </div>
    </>
  )
}

const Page = () => {
  const [ currentGroup, setCurrentGroup ] = useState<(typeof GROUPS)[number]>("programmer");
  const [ loaded, setLoaded ] = useState<boolean>(false);
  const [ date, setDate ] = useState<Date>(new Date());
  const [ mainInterval, setMainInterval ] = useState<NodeJS.Timeout|null>(null);

  const dropdownContent = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 100);

    setMainInterval(interval);

    setLoaded(true);

    return (() => {
      clearInterval(mainInterval || interval);
    });
  }, []);

  if (!loaded) {
    return (
      <Layout currentGroup={currentGroup}>
        <div className={styles.info}>
          <h2 className={styles.text}>
            Привет! Я {NICKNAME}, и я {Russian[currentGroup].toLowerCase()}
          </h2>
          <div>
            {INFO[currentGroup]}
          </div>
        </div>
      </Layout>
    )
  }

  const age = getFullYear(date);

  const years = `${age.years} ${ruWords(age.years, ["год", "года", "лет"])}`;
  const months = `${age.months} ${ruWords(age.months, ["месяц", "месяца", "месяцев"])}`;
  const days = `${age.days} ${ruWords(age.days, ["день", "дня", "дней"])}`;
  const hours = `${age.hours} ${ruWords(age.hours, ["час", "часа", "часов"])}`;
  const minutes = `${age.minutes} ${ruWords(age.minutes, ["минута", "минуты", "минут"])}`;
  const seconds = `${age.seconds} ${ruWords(age.seconds, ["секунда", "секунды", "секунд"])}`;

  return (
    <Layout currentGroup={currentGroup}>
      <div className={styles.main_info}>
        <div className={styles.info}>
          <h2
            className={[styles.text, styles.info__text__h2].join(" ")}
            onClick={() => {
              if (mainInterval) {
                clearInterval(mainInterval);
                setMainInterval((previous) => {
                  if (previous) {
                    clearInterval(previous)
                  };

                  return null;
                })
              } else {
                setMainInterval(setInterval(() => {
                  setDate(new Date());
                }, 100))
              }
            }}
          >
            Мне уже {years} {months} {days} {hours} {minutes} и {seconds}!
          </h2>

          <h2 className={styles.text}>
            Привет! Я {NICKNAME}, и я
            <Dropdown
              ref={dropdownContent}
              className={styles.dropdown}
              summary={<button><h3>{Russian[currentGroup].toLocaleLowerCase()}</h3></button>}
            >
              {
                GROUPS.filter(group => group !== currentGroup).map(group => (
                  <button
                    key={"btn" + group}
                    onClick={() => {
                      if (!dropdownContent.current) return;
                      
                      dropdownContent.current.style.display = dropdownContent.current.style.display === "flex"
                        ? "none"
                        : "flex";

                      setCurrentGroup(group);
                    }}
                  >{Russian[group]}</button>
                ))
              }
            </Dropdown>
          </h2>
        </div>

        <div className={styles.group_info}>
          {INFO[currentGroup]}
        </div>
      </div>
      
      <div className={styles.groups}>
        {
          GroupData({group: currentGroup}).map(data => (
            <Link href={data.link} key={data.name} className={styles.group_data}>
              <h3>{data.name}</h3>
              <hr />
              <span>{ADDITONLA_INFO[Russian[data.name]]}</span>
            </Link>
          ))
        }
      </div>
    </Layout>
  )
};

export default Page;
