import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import '@/shared/presentation/styles/index.css';
import { podcastUseCases } from './dependencies';
import { AppProviders } from './providers/AppProviders';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders podcastUseCases={podcastUseCases}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
