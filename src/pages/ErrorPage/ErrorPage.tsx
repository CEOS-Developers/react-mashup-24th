import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Button from '../../components/common/Button';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-0">
      <div className="flex w-full flex-col items-center px-24">
        <div className="flex w-full max-w-[52.6875rem] items-center justify-center gap-[5rem]">
          <div className="flex h-[36.875rem] min-w-px flex-[1_0_0] items-start px-32 py-[9.875rem]">
            <img
              src={logo}
              alt="LBOX"
              width={274}
              height={274}
              className="block size-[17.125rem] shrink-0 object-cover"
            />
          </div>

          <div className="flex h-[36.875rem] shrink-0 flex-col items-start justify-center">
            <div className="flex flex-col items-start gap-[5rem]">
              <div className="flex flex-col items-start gap-8 whitespace-nowrap">
                <h1 className="heading-lg text-(--color-text-primary)">
                  일시적인 오류가 발생했습니다.
                </h1>
                <p className="document-body text-gray-600">
                  잠시 후 다시 시도하거나 이전 페이지로 돌아가 주세요.
                </p>
              </div>
              <Button onClick={() => navigate('/')} className="h-[3.5rem] w-[11.5rem]">
                홈으로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
