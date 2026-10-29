import iconLink from '../../../assets/icons/document/icon-link.svg';
import iconMenu from '../../../assets/icons/document/icon-menu.svg';
import iconPannel from '../../../assets/icons/document/icon-pannel.svg';
import iconShare from '../../../assets/icons/document/icon-share.svg';
import iconTextSearch from '../../../assets/icons/document/icon-text-search.svg';
import toolbarDivider from '../../../assets/icons/document/toolbar-divider.svg';
import IconButton from '../../../components/common/IconButton';

const BUTTON_CLASS = 'size-[1.875rem] rounded-sm p-4';
const ICON_CLASS = 'block size-[1.25rem] max-w-none shrink-0';

interface DocumentToolbarProps {
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

function DocumentToolbar({ isPanelOpen, onTogglePanel }: DocumentToolbarProps) {
  return (
    <div className="absolute bottom-[1rem] left-[calc(50%+0.5px)] flex -translate-x-1/2 flex-col items-start rounded-md border-[0.5px] border-gray-400 bg-(--color-surface-default) p-4 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.12)]">
      <div className="flex shrink-0 items-center gap-8">
        <IconButton label="공유" className={BUTTON_CLASS}>
          <img src={iconShare} alt="" width={20} height={20} className={ICON_CLASS} />
        </IconButton>
        <IconButton label="내보내기" className={BUTTON_CLASS}>
          <img src={iconShare} alt="" width={20} height={20} className={ICON_CLASS} />
        </IconButton>
        <IconButton label="본문 검색" className={BUTTON_CLASS}>
          <span className="relative block size-[1.25rem] shrink-0 overflow-clip">
            <img
              src={iconTextSearch}
              alt=""
              width={16}
              height={11.8333}
              className="absolute top-[0.28125rem] left-[0.125rem] block h-[0.73958rem] w-[1rem] max-w-none"
            />
          </span>
        </IconButton>
        <IconButton label="더보기" className={BUTTON_CLASS}>
          <img src={iconMenu} alt="" width={20} height={20} className={ICON_CLASS} />
        </IconButton>

        <span className="relative block h-[1.25rem] w-0 shrink-0">
          <img
            src={toolbarDivider}
            alt=""
            width={0.5}
            height={20}
            className="absolute inset-y-0 -left-[0.25px] block h-[1.25rem] w-[0.5px] max-w-none"
          />
        </span>

        <IconButton label="새 창에서 열기" className={BUTTON_CLASS}>
          <img src={iconLink} alt="" width={20} height={20} className={ICON_CLASS} />
        </IconButton>
        <IconButton
          label={isPanelOpen ? '패널 닫기' : '패널 열기'}
          aria-pressed={isPanelOpen}
          onClick={onTogglePanel}
          className={`${BUTTON_CLASS} rotate-180`}
        >
          <span className="relative block size-[1.25rem] shrink-0 overflow-clip">
            <img
              src={iconPannel}
              alt=""
              width={16.2778}
              height={14.75}
              className="absolute top-[0.20312rem] left-[0.125rem] block h-[0.92188rem] w-[1.01736rem] max-w-none"
            />
          </span>
        </IconButton>
      </div>
    </div>
  );
}

export default DocumentToolbar;
