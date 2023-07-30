function addDays(date: Date, days: number): Date {
  if (!days) return date;

  date.setDate(date.getDate() + days);

  return date;
}

function getShortDayName(date: Date): string {
  return Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
}

export { addDays, getShortDayName };
