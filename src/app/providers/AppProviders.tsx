import type { PropsWithChildren } from 'react';
import { PodcastRepositoryContext } from '@/modules/podcasts/presentation/contexts/PodcastRepositoryContext';
import { LoadingProvider } from '@/shared/presentation/providers/LoadingProvider';
import { podcastRepository } from '../dependencies';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <PodcastRepositoryContext value={podcastRepository}>
    <LoadingProvider>{children}</LoadingProvider>
  </PodcastRepositoryContext>
);
