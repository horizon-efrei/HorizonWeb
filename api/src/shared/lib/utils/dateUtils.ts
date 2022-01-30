export function isSameDay(first: Date, second: Date): boolean {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function isDayBeforeYesterday(date: Date): boolean {
  const dayBeforeYesterday = (new Date(date.getTime()));
  dayBeforeYesterday.setDate(date.getDate() - 2);

  return isSameDay(dayBeforeYesterday, date);
}
