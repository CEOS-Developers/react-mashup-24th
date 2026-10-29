const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const kstDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const matchTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export type CalendarDay = {
  key: string;
  date: number;
  dayLabel: string;
  type: 'default' | 'saturday' | 'sunday' | 'holiday';
};

export function formatDateKey(date: Date) {
  const parts = kstDateFormatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)!.value;
  return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
}

export function formatMatchTime(isoTime: string) {
  return matchTimeFormatter.format(new Date(isoTime));
}

export function getCalendarDays(today: Date, count = 14, holidays: string[] = []): CalendarDay[] {
  const firstDay = new Date(`${formatDateKey(today)}T00:00:00+09:00`);

  return Array.from({ length: count }, (_, index) => {
    const day = new Date(firstDay.getTime() + index * 24 * 60 * 60 * 1000);
    const key = formatDateKey(day);
    const weekday = new Date(`${key}T00:00:00Z`).getUTCDay();

    let type: CalendarDay['type'] = 'default';
    if (holidays.includes(key)) type = 'holiday';
    else if (weekday === 0) type = 'sunday';
    else if (weekday === 6) type = 'saturday';

    return {
      key,
      date: Number(key.slice(-2)),
      dayLabel: index === 0 ? '오늘' : DAY_LABELS[weekday],
      type,
    };
  });
}
