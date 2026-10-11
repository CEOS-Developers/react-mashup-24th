import { useMemo } from 'react';
import { getCalendarDays } from '../../../utils/date';
import DayButton from './DayButton';

type CalendarProps = {
  selectedKey: string;
  onSelect: (key: string) => void;
};

function Calendar({ selectedKey, onSelect }: CalendarProps) {
  const days = useMemo(() => getCalendarDays(new Date()), []);

  return (
    <div className="flex gap-1 overflow-x-auto px-4 [scrollbar-width:none]">
      {days.map((day) => (
        <DayButton
          key={day.key}
          dayLabel={day.dayLabel}
          date={day.date}
          type={day.type}
          selected={day.key === selectedKey}
          onClick={() => onSelect(day.key)}
        />
      ))}
    </div>
  );
}

export default Calendar;
