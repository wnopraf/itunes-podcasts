import type { PropsWithChildren } from 'react';
import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import { PodcastRepositoryContext } from '@/modules/podcasts/presentation/contexts/PodcastRepositoryContext';
import { LoadingProvider } from '@/shared/presentation/providers/LoadingProvider';

type AppProvidersProps = PropsWithChildren<{
  podcastRepository: PodcastRepository;
}>;

export const AppProviders = ({ podcastRepository, children }: AppProvidersProps) => (
  <PodcastRepositoryContext value={podcastRepository}>
    <LoadingProvider>{children}</LoadingProvider>
  </PodcastRepositoryContext>
);
