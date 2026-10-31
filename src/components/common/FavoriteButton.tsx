import type { ButtonHTMLAttributes } from 'react';
import iconFavStroke from '../../assets/icons/icon-fav-stroke.svg';
import iconFavFilled from '../../assets/icons/icon-fav-filled.svg';

export type FavoriteButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-pressed'
> & {
  selected?: boolean;
  icon?: string;
  filledIcon?: string;
  color?: string;
};

function FavoriteButton({
  selected = false,
  icon = iconFavStroke,
  filledIcon,
  color = 'var(--color-fg-accent-favorite)',
  type = 'button',
  className = '',
  'aria-label': ariaLabel = '즐겨찾기',
  ...buttonProps
}: FavoriteButtonProps) {
  const selectedIcon = filledIcon ?? (icon === iconFavStroke ? iconFavFilled : icon);
  const iconSource = selected ? selectedIcon : icon;

  return (
    <button
      {...buttonProps}
      type={type}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={`flex w-9 shrink-0 cursor-pointer flex-col items-center justify-center text-fg-neutral-default focus-visible:outline-2 focus-visible:outline-border-focus disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span
        aria-hidden="true"
        className="size-6 shrink-0 bg-current mask-contain mask-center mask-no-repeat"
        style={{
          color: selected ? color : undefined,
          maskImage: `url("${iconSource}")`,
          WebkitMaskImage: `url("${iconSource}")`,
        }}
      />
    </button>
  );
}

export default FavoriteButton;
