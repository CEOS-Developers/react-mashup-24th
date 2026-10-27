import { useState, type ChangeEvent } from "react";
import { Navigate } from "react-router";
import Button from "../components/Button";
import Header from "../components/Header";
import RecipientSelectField from "../components/w3/RecipientSelectField";
import TextField, { MultiInputField } from "../components/TextField";
import { CURRENCIES, isCurrencyCode } from "../constants/currencies";
import { RECIPIENT_COUNTRY_BANKS } from "../mocks/recipientOptions";
import { PATHS } from "../routes/paths";
import { useTransferStore } from "../stores/useTransferStore";

interface RecipientForm {
  nationality: string;
  bank: string;
  accountNumber: string;
  lastName: string;
  middleName: string;
  firstName: string;
  phoneNumber: string;
  birthday: string;
}

const INITIAL_FORM: RecipientForm = {
  nationality: "",
  bank: "",
  accountNumber: "",
  lastName: "",
  middleName: "",
  firstName: "",
  phoneNumber: "",
  birthday: "",
};

function InformationPage() {
  const transfer = useTransferStore((state) => state.transfer);
  const [form, setForm] = useState(INITIAL_FORM);

  if (!transfer?.receiveMethod) return <Navigate to={PATHS.HOME} replace />;

  const phoneCode = isCurrencyCode(transfer.toCurrency)
    ? CURRENCIES[transfer.toCurrency].phoneCode
    : "";
  const receivingCountry = isCurrencyCode(transfer.toCurrency)
    ? CURRENCIES[transfer.toCurrency].country
    : "";
  const nationalityOptions = [
    ...(receivingCountry
      ? [{ label: receivingCountry, value: receivingCountry }]
      : []),
    { label: "기타", value: "기타" },
  ];
  const bankOptions =
    RECIPIENT_COUNTRY_BANKS.find(
      ({ country }) => country === receivingCountry,
    )?.banks.map((bank) => ({ label: bank, value: bank })) ?? [];

  const updateField = (field: keyof RecipientForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleInputChange =
    (field: keyof RecipientForm) => (event: ChangeEvent<HTMLInputElement>) => {
      updateField(field, event.target.value);
    };

  const handleNumericInputChange =
    (field: "accountNumber" | "phoneNumber") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      updateField(field, event.target.value.replace(/\D/g, ""));
    };

  const handleNext = () => {
    const requiredFields = [
      form.nationality,
      form.bank,
      form.accountNumber,
      form.lastName,
      form.firstName,
      form.phoneNumber,
    ];

    if (requiredFields.some((value) => !value.trim())) {
      window.alert("필수 정보를 입력해주세요. 입력 오류 모달은 아직 준비 중입니다.");
      return;
    }

    window.alert("다음 단계는 아직 준비 중입니다.");
  };

  return (
    <div className="flex h-dvh flex-col items-center overflow-hidden bg-white">
      <Header title="수취인 정보" />

      <main className="flex min-h-0 w-[402px] flex-1 flex-col gap-gap-16 overflow-y-auto px-[20px] py-padding-wide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <RecipientSelectField
          label="수취인 국적 (선택)"
          floatingLabel="국적 (선택)"
          title="국적 (선택)"
          value={form.nationality}
          placeholder="선택해 주세요"
          searchPlaceholder="국적 검색"
          options={nationalityOptions}
          onChange={(nationality) => updateField("nationality", nationality)}
        />

        <RecipientSelectField
          label="수취인 계좌은행"
          floatingLabel="은행"
          title="은행"
          value={form.bank}
          placeholder="은행을 선택해 주세요"
          searchPlaceholder="은행 검색"
          options={bankOptions}
          disabled={bankOptions.length === 0}
          onChange={(bank) => updateField("bank", bank)}
        />

        <TextField
          externalLabel="계좌번호"
          floatingLabel="계좌번호"
          value={form.accountNumber}
          placeholder="숫자만 입력"
          inputMode="numeric"
          bordered
          onChange={handleNumericInputChange("accountNumber")}
          className="w-full"
        />

        <div className="flex flex-col gap-gap-4">
          <MultiInputField
            externalLabel="수취인 영문 이름"
            className="w-full"
            fields={[
              {
                value: form.lastName,
                floatingLabel: "성",
                placeholder: "성",
                autoComplete: "family-name",
                bordered: true,
                onChange: handleInputChange("lastName"),
              },
              {
                value: form.middleName,
                floatingLabel: "중간이름",
                placeholder: "중간이름",
                autoComplete: "additional-name",
                bordered: true,
                onChange: handleInputChange("middleName"),
              },
              {
                value: form.firstName,
                floatingLabel: "이름",
                placeholder: "이름",
                autoComplete: "given-name",
                bordered: true,
                onChange: handleInputChange("firstName"),
              },
            ]}
          />
          <p className="text-body-4-regular text-text-tertiary">
            ※ 수취인 국적이 베트남이면 중간이름 필수
          </p>
        </div>

        <div className="flex flex-col gap-gap-4">
          <label
            htmlFor="recipient-phone"
            className="text-body-2-semibold text-text-default"
          >
            수취인 연락처
          </label>
          <div className="flex min-h-[56px] flex-col justify-center gap-gap-2 rounded-medium border border-border-default bg-surface-default px-padding-wide py-padding-medium">
            {form.phoneNumber && (
              <span className="text-body-5-semibold text-text-tertiary">
                휴대폰 번호
              </span>
            )}
            <div className="flex items-center gap-gap-8">
              <span className="shrink-0 text-body-1-semibold text-text-secondary">
                {phoneCode}
              </span>
              <input
                id="recipient-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={form.phoneNumber}
                onChange={handleNumericInputChange("phoneNumber")}
                placeholder="전화번호 입력"
                className="min-w-0 flex-1 bg-transparent text-body-1-semibold text-text-default outline-none placeholder:font-normal placeholder:text-text-disabled"
              />
            </div>
          </div>
        </div>

        <TextField
          externalLabel="생년월일 (선택)"
          floatingLabel="생년월일 (선택)"
          value={form.birthday}
          placeholder="YYYY-MM-DD"
          bordered
          onChange={handleInputChange("birthday")}
          className="w-full"
        />
      </main>

      <footer className="flex w-[402px] shrink-0 flex-col bg-white px-[20px] pt-padding-wide pb-[calc(var(--unit-24)+env(safe-area-inset-bottom))]">
        <Button size="lg" className="w-full" onClick={handleNext}>
          다음
        </Button>
      </footer>
    </div>
  );
}

export default InformationPage;
