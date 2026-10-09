import { useState } from "react";
import NavBar from "../components/NavBar";
import MyWallet from "../components/MyWallet";
// [임시 송금 카드] 송금 컴포넌트 완성되면 교체
import Toggle, { type ToggleValue } from "../components/Toggle";
import ExchangeRate from "../components/ExchangeRate";
import Button from "../components/Button";
// [임시 송금 카드] 끝

function HomePage() {
  // [임시 송금 카드] 송금 컴포넌트 완성되면 교체
  const [region, setRegion] = useState<ToggleValue>("overseas");
  // [임시 송금 카드] 끝

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F6F8FB]">
      <main className="flex flex-1 flex-col items-center gap-gap-large px-[20px] py-padding-wide">
        <MyWallet balance={100} />

        {/* [임시 송금 카드] 송금 컴포넌트 완성되면 이 블록을 잘라내고 교체 */}
        <div className="flex w-[362px] flex-col gap-gap-large rounded-medium bg-surface-default p-padding-wide">
          <div className="flex items-center justify-between px-padding-small">
            <span className="text-body-2-semibold text-text-secondary">
              송금
            </span>
            <Toggle value={region} onChange={setRegion} />
          </div>
          <ExchangeRate fromCurrency="KRW" toCurrency="VND" rate={19.03} />
          <Button size="md" className="self-center">
            송금하기
          </Button>
        </div>
        {/* [임시 송금 카드] 끝 */}
      </main>
      <NavBar />
    </div>
  );
}

export default HomePage;
