import { DATE_OF_BIRTH } from "@/app/page.constants";
import { ruWords } from "./russian";

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

export type Age = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type AgeKeys = keyof Age;
type RecordAge<T> = Record<AgeKeys, T>;

const RUSSIAN_WORDS_FOR_AGE: Record<keyof Age, [string, string, string]> = {
  years: ["год", "года", "лет"],
  months: ["месяц", "месяца", "месяцев"],
  days: ["день", "дня", "дней"],
  hours: ["час", "часа", "часов"],
  minutes: ["минута", "минуты", "минут"],
  seconds: ["секунда", "секунды", "секунд"],
} as const;

export const getFullAge = (now: Date, accuracy: 1|10|100|1000 = 10): Age => {
  const timestamp = (now.getTime() - dateOfBirth.getTime()) / SECONDS;

  const years = Math.floor(timestamp / toYear);
  const days = Math.floor((timestamp / toDay) - (years * YEAR) - (years / LEAP_YEAR));
  const months = Math.floor(days / MONTH);
  const hours = Math.floor(timestamp / toHours) - (Math.floor(timestamp / toDay) * DAY);
  const minutes = Math.floor(timestamp / toMinutes) - (Math.floor(timestamp / toHours) * HOUR);
  const seconds = Math.floor((timestamp - (Math.floor(timestamp / toMinutes) * MINUTE)) * accuracy) / accuracy;

  return {
    years,
    months,
    days: days - (months * 31),
    hours,
    minutes,
    seconds
  };
};

export const formatAge = (age: Age): RecordAge<string> => {
  return Object.fromEntries((Object.keys(age) as AgeKeys[]).map(key => [
    key, `${age[key]} ${ruWords(age[key], RUSSIAN_WORDS_FOR_AGE[key])}`])) as RecordAge<string>;
}

export const formatedAgeToString = (age: RecordAge<string>) => Object.values(age).join(" ");
