import type { CaseInfoRow, CaseTextSection } from '../caseDetail.types';

interface CaseBodyProps {
  courtLines: string[];
  infoRows: CaseInfoRow[];
  sections: CaseTextSection[];
}

function CaseBody({ courtLines, infoRows, sections }: CaseBodyProps) {
  return (
    <section className="flex w-full grow flex-col items-center gap-[3.75rem] py-[3.75rem] text-(--color-text-primary)">
      <div className="document-title shrink-0 text-center whitespace-nowrap">
        {courtLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {infoRows.map((row) => (
        <div
          key={row.label}
          className="document-body flex shrink-0 items-start justify-center gap-[3.75rem] whitespace-nowrap"
        >
          <p className="shrink-0 text-center">{row.label}</p>
          <div className="shrink-0">
            {row.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      ))}

      {sections.map((section) => (
        <div key={section.heading} className="flex w-full shrink-0 flex-col gap-16">
          <h2 className="heading-md">{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="document-body break-words">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}

export default CaseBody;
