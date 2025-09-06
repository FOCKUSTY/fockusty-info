'use client'

import { useEffect, useRef, useState } from "react";

import { GROUPS, Russian } from "@/api/paths";
import { Dropdown } from "@/components/dropdown";

import { INFO, NICKNAME, DATE_OF_BIRTH } from "./page.constants";

import styles from "./page.module.css";
import { ruWords } from "@/api/russian";

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

const Page = () => {
  const [ currentGroup, setCurrentGroup ] = useState<(typeof GROUPS)[number]>("programmer");
  const [ loaded, setLoaded ] = useState<boolean>(false);
  const [ date, setDate ] = useState<Date>(new Date());

  const dropdownContent = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 100);

    setLoaded(true);

    return (() => {
      clearInterval(interval);
    });
  }, []);

  if (!loaded) {
    return (
      <div
        className="page-center"
        style={{
          justifySelf: "center",
          gap: "10px"
        }}
      >
        <div className={styles.info}>
          <h2>
            Привет! Я {NICKNAME}, и я {Russian[currentGroup]}
          </h2>
          <div>
            {INFO[currentGroup]}
          </div>
        </div>
      </div>
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
    <div
      className="page-center"
      style={{
        justifySelf: "center",
        gap: "10px"
      }}
    >
      <div className={styles.info}>
        <h2>
          Мне уже {years} {months} {days} {hours} {minutes} и {seconds}!
        </h2>

        <h2>
          Привет! Я {NICKNAME}, и я
          <Dropdown
            ref={dropdownContent}
            className={styles.dropdown}
            summary={<button>{Russian[currentGroup].toLocaleLowerCase()}</button>}
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

      <div>
        {INFO[currentGroup]}
      </div>
    </div>
  )
};

export default Page;
