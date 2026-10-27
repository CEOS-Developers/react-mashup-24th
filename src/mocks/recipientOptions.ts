export interface RecipientCountryBanks {
  country: string;
  banks: readonly string[];
}

export const RECIPIENT_COUNTRY_BANKS: readonly RecipientCountryBanks[] = [
  {
    country: "한국",
    banks: ["KB국민은행", "신한은행", "우리은행", "하나은행", "NH농협은행"],
  },
  {
    country: "싱가포르",
    banks: ["DBS", "OCBC", "UOB", "Standard Chartered"],
  },
  {
    country: "인도네시아",
    banks: ["BCA", "Bank Mandiri", "BNI", "BRI", "CIMB Niaga"],
  },
  {
    country: "베트남",
    banks: [
      "Agribank",
      "Vietcombank",
      "BIDV",
      "Vietinbank",
      "ABBank",
      "ACB",
      "ANZ",
      "BacA Bank",
      "Bank of China",
    ],
  },
];
