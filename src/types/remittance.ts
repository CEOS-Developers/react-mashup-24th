export interface CreateRemittanceRequest {
  receiveCurrency: string;
  sendAmount: number;
}

export interface Remittance {
  remittanceId: number;
  receiveCurrency: string;
  sendAmount: number;
  sentAt: string;
}
