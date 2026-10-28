import type { ExchangeRate } from "./exchangeRate";

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
interface RemittanceAmount {
  countryCode: string;
  currency: string;
  amount: number;
}

export type LatestRemittance =
  | {
      hasHistory: true;
      send: RemittanceAmount;
      receive: RemittanceAmount;
      exchangeRate: ExchangeRate;
    }
  | {
      hasHistory: false;
      send?: RemittanceAmount | null;
      receive?: RemittanceAmount | null;
      exchangeRate?: ExchangeRate | null;
    };
