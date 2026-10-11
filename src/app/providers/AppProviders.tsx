import type { PropsWithChildren } from 'react';
import { PodcastRepositoryContext } from '@/modules/podcasts/presentation/contexts/PodcastRepositoryContext';
import { podcastRepository } from '../dependencies';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <PodcastRepositoryContext value={podcastRepository}>{children}</PodcastRepositoryContext>
);
