const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export type CalendarDay = {
  key: string;
  date: number;
  dayLabel: string;
  type: 'default' | 'saturday' | 'sunday' | 'holiday';
};

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCalendarDays(today: Date, count = 14, holidays: string[] = []): CalendarDay[] {
  return Array.from({ length: count }, (_, index) => {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
    const key = formatDateKey(day);
    const weekday = day.getDay();

    let type: CalendarDay['type'] = 'default';
    if (holidays.includes(key)) type = 'holiday';
    else if (weekday === 0) type = 'sunday';
    else if (weekday === 6) type = 'saturday';

    return {
      key,
      date: day.getDate(),
      dayLabel: index === 0 ? '오늘' : DAY_LABELS[weekday],
      type,
    };
  });
}
