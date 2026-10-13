import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import '@/shared/presentation/styles/index.css';
import { podcastRepository } from './dependencies';
import { AppProviders } from './providers/AppProviders';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders podcastRepository={podcastRepository}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
