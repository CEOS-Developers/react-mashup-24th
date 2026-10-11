import krwFlag from "../assets/flags/southkorea.png";
import sgdFlag from "../assets/flags/singapor.png";
import idrFlag from "../assets/flags/indonesia.png";
import vndFlag from "../assets/flags/vietnam.png";

export const CURRENCIES = {
  KRW: { country: "한국", name: "대한민국 원", flag: krwFlag },
  SGD: { country: "싱가포르", name: "싱가포르 달러", flag: sgdFlag },
  IDR: { country: "인도네시아", name: "인도네시아 루피아", flag: idrFlag },
  VND: { country: "베트남", name: "베트남 동", flag: vndFlag },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];

// API 등에서 받은 문자열이 지원 통화인지 확인합니다.
export function isCurrencyCode(code: string): code is CurrencyCode {
  return Object.prototype.hasOwnProperty.call(CURRENCIES, code);
}
