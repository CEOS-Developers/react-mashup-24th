import iconScrollTop from '../../../assets/icons/document/icon-scroll-top.svg';
import IconButton from '../../../components/common/IconButton';

interface ScrollTopButtonProps {
  onClick: () => void;
  isPanelOpen?: boolean;
}

function ScrollTopButton({ onClick, isPanelOpen = false }: ScrollTopButtonProps) {
  return (
    <IconButton
      label="맨 위로"
      onClick={onClick}
      className={`absolute ${isPanelOpen ? 'right-[0.84375rem]' : 'right-[0.21875rem]'} bottom-[0.71875rem] size-[2.5rem] overflow-clip rounded-md border border-(--color-border-default) bg-(--color-surface-default) shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]`}
    >
      <img
        src={iconScrollTop}
        alt=""
        width={20}
        height={20}
        className="block size-[1.25rem] max-w-none"
      />
    </IconButton>
  );
}

export default ScrollTopButton;
