import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import '@/shared/presentation/styles/index.css';
import { podcastCache, podcastRepository } from './dependencies';
import { AppProviders } from './providers/AppProviders';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders podcastRepository={podcastRepository} podcastCacheReader={podcastCache}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
