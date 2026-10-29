interface ChipProps {
  label: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

const Chip = ({ label, icon, iconPosition = 'left', onClick }: ChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-[0.25rem] rounded-[0.25rem] border border-gray-200 bg-white px-[0.5rem] py-[0.25rem] text-[0.75rem] font-medium text-gray-700"
    >
      {icon && iconPosition === 'left' && <img src={icon} alt="" className="h-[1rem] w-[1rem]" />}

      <span>{label}</span>

      {icon && iconPosition === 'right' && <img src={icon} alt="" className="h-[1rem] w-[1rem]" />}
    </button>
  );
};

export default Chip;
