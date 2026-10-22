import { ScrollRestoration } from 'react-router';
import { AppLayout } from '@/app/layouts/AppLayout';

export const RootLayout = () => (
  <>
    <ScrollRestoration />
    <AppLayout />
  </>
);
