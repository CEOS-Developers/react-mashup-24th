interface CitationCardProps {
  label: string;
  onClick?: () => void;
}

function CitationCard({ label, onClick }: CitationCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-[1.5rem] w-full shrink-0 cursor-pointer items-center bg-(--color-surface-default) px-12 text-left"
    >
      <span className="caption-md flex h-full min-w-px flex-[1_0_0] items-center rounded-sm px-8 py-4 whitespace-nowrap text-(--color-text-primary) group-hover:bg-gray-200 group-focus-visible:bg-gray-200">
        {label}
      </span>
    </button>
  );
}

export default CitationCard;
