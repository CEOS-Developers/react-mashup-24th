export const judgmentKeys = {
  detail: (judgmentId: number) => ['judgments', judgmentId, 'detail'] as const,
  citations: (judgmentId: number) => ['judgments', judgmentId, 'citations'] as const,
};
