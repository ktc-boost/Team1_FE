import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import '@/shared/design-tokens/index.css';
import '@/app/styles/global.css';
import App from './App.tsx';
import { initSentry } from '@/shared/lib/sentry';

initSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
