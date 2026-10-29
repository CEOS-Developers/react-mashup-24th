import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { initializeAuth } from '../apis/auth';

interface AuthGateProps {
  children: ReactNode;
}

function AuthGate({ children }: AuthGateProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    initializeAuth().then(
      () => {
        if (active) setStatus('ready');
      },
      () => {
        if (active) setStatus('error');
      },
    );

    return () => {
      active = false;
    };
  }, [attempt]);

  if (status === 'ready') {
    return children;
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[375px] flex-col items-center justify-center gap-4 bg-bg-neutral-default px-4 text-center text-fg-neutral-default">
      {status === 'loading' ? (
        <p role="status" className="typo-body-medium-sb">
          접속을 준비하고 있어요.
        </p>
      ) : (
        <>
          <p role="alert" className="typo-body-medium-sb">
            접속을 준비하지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('loading');
              setAttempt((previous) => previous + 1);
            }}
            className="h-10 cursor-pointer rounded-full bg-bg-brand-subtle px-4 typo-button-medium-md"
          >
            다시 시도
          </button>
        </>
      )}
    </div>
  );
}

export default AuthGate;
