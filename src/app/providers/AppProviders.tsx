import type { PropsWithChildren } from 'react';
import type { PodcastUseCases } from '@/modules/podcasts/application/PodcastUseCases';
import { PodcastUseCasesContext } from '@/modules/podcasts/presentation/contexts/PodcastUseCasesContext';
import { LoadingProvider } from '@/shared/presentation/providers/LoadingProvider';

type AppProvidersProps = PropsWithChildren<{
  podcastUseCases: PodcastUseCases;
}>;

export const AppProviders = ({ podcastUseCases, children }: AppProvidersProps) => (
  <PodcastUseCasesContext value={podcastUseCases}>
    <LoadingProvider>{children}</LoadingProvider>
  </PodcastUseCasesContext>
);
