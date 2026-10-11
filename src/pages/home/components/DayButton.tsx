type DayType = 'default' | 'saturday' | 'sunday' | 'holiday';

type DayButtonProps = {
  dayLabel: string;
  date: number;
  type?: DayType;
  selected?: boolean;
  onClick?: () => void;
};

const dayLabelColor: Record<DayType, string> = {
  default: 'text-fg-neutral-subtle',
  saturday: 'text-fg-accent-calendar-blue',
  sunday: 'text-fg-accent-calendar-red',
  holiday: 'text-fg-accent-calendar-red',
};

const dateColor: Record<DayType, string> = {
  default: 'text-fg-neutral-muted',
  saturday: 'text-fg-neutral-muted',
  sunday: 'text-fg-neutral-muted',
  holiday: 'text-fg-accent-calendar-red',
};

function DayButton({ dayLabel, date, type = 'default', selected = false, onClick }: DayButtonProps) {
  const backgroundClassName = selected ? 'bg-bg-neutral-solid' : 'bg-bg-neutral-weak';
  const dayLabelClassName = selected ? 'text-fg-brand-default' : dayLabelColor[type];
  const dateClassName = selected ? 'text-fg-brand-default' : dateColor[type];

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-[52px] w-[45px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-medium py-2 ${backgroundClassName}`}
    >
      <span className={`typo-button-small-md ${dayLabelClassName}`}>{dayLabel}</span>
      <span className={`typo-button-large-md ${dateClassName}`}>{date}</span>
    </button>
  );
}

export default DayButton;