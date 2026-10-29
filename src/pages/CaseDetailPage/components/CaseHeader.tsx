interface CaseHeaderProps {
  title: string;
  caseName: string;
}

function CaseHeader({ title, caseName }: CaseHeaderProps) {
  return (
    <header className="flex w-full shrink-0 flex-col items-center gap-16 py-[3.75rem] text-center break-words text-(--color-text-primary)">
      <h1 className="heading-lg w-full shrink-0">{title}</h1>
      <p className="document-body w-full shrink-0">{caseName}</p>
    </header>
  );
}

export default CaseHeader;
