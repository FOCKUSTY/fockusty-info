export const BIRTH_DAY = [1, 7] as const;
export const NEW_YEAR = [1, 0] as const;

export const isSpecificDay = (day: number, month: number, date: Date = new Date()): boolean => {
  return date.getDate() === day && date.getMonth() === month;
};

export const isBirthDay = (date: Date = new Date()): boolean => {
  return isSpecificDay(...BIRTH_DAY, date);
};

export const isNewYear = (date: Date = new Date()): boolean => {
  return isSpecificDay(...NEW_YEAR, date);
};
