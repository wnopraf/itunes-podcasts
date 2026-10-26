import type { PropsWithChildren } from 'react';
import type { PodcastCacheReader } from '@/modules/podcasts/application/ports/PodcastCacheReader';
import type { PodcastRepository } from '@/modules/podcasts/domain/PodcastRepository';
import { PodcastCacheReaderContext } from '@/modules/podcasts/presentation/contexts/PodcastCacheReaderContext';
import { PodcastRepositoryContext } from '@/modules/podcasts/presentation/contexts/PodcastRepositoryContext';
import { LoadingProvider } from '@/shared/presentation/providers/LoadingProvider';

type AppProvidersProps = PropsWithChildren<{
  podcastRepository: PodcastRepository;
  podcastCacheReader?: PodcastCacheReader;
}>;

export const AppProviders = ({
  podcastRepository,
  podcastCacheReader,
  children,
}: AppProvidersProps) => (
  <PodcastRepositoryContext value={podcastRepository}>
    <PodcastCacheReaderContext value={podcastCacheReader ?? null}>
      <LoadingProvider>{children}</LoadingProvider>
    </PodcastCacheReaderContext>
  </PodcastRepositoryContext>
);
