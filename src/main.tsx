import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.tsx';
import AuthGate from './components/AuthGate';

const queryClient = new QueryClient();

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_USE_MOCK !== 'true') return;
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledFrame: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthGate>
          <App />
        </AuthGate>
        <Toaster position="bottom-center" containerStyle={{ bottom: 96 }} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
