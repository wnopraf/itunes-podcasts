import { createContext, use } from 'react';
import type { PodcastRepository } from '../../domain/PodcastRepository';

export const PodcastRepositoryContext = createContext<PodcastRepository | null>(null);

export const usePodcastRepository = (): PodcastRepository => {
  const repository = use(PodcastRepositoryContext);
  if (!repository) {
    throw new Error('usePodcastRepository must be used within PodcastRepositoryContext');
  }
  return repository;
};
