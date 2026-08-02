import { dateTimeDiff } from 'date-differencer';
import { ruWords } from './russian';

export const DATE_OF_BIRTH = {
  year: 2009,
  month: 7,
  day: 1,
  hours: 0,
} as const;

export const BIRTH_DATE = new Date(
  Date.UTC(DATE_OF_BIRTH.year, DATE_OF_BIRTH.month, DATE_OF_BIRTH.day, DATE_OF_BIRTH.hours, 0, 0),
);

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

const RUSSIAN_WORDS_FOR_AGE: Record<AgeKeys, [string, string, string]> = {
  years: ['год', 'года', 'лет'],
  months: ['месяц', 'месяца', 'месяцев'],
  days: ['день', 'дня', 'дней'],
  hours: ['час', 'часа', 'часов'],
  minutes: ['минута', 'минуты', 'минут'],
  seconds: ['секунда', 'секунды', 'секунд'],
} as const;

export const getFullAge = (now: Date, accuracy: 1 | 10 | 100 | 1000 = 10): Age => {
  const {
    years,
    months,
    days,
    hours,
    minutes,
    seconds: sec,
    milliseconds,
  } = dateTimeDiff(BIRTH_DATE, now);

  const seconds = sec + Math.round((milliseconds / 1000) * accuracy) / accuracy;

  return { years, months, days, hours, minutes, seconds };
};

export const formatAge = (age: Age): RecordAge<string> => {
  return Object.fromEntries(
    (Object.keys(age) as AgeKeys[]).map((key) => [
      key,
      `${age[key]} ${ruWords(age[key], RUSSIAN_WORDS_FOR_AGE[key])}`,
    ]),
  ) as RecordAge<string>;
};

export const formattedAgeToString = (age: RecordAge<string>): string =>
  Object.values(age).join(' ');

export const getMyAge = (date: Date, accuracy: 1 | 10 | 100 | 1000 = 10): string =>
  formattedAgeToString(formatAge(getFullAge(date, accuracy)));
