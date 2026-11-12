import type { PodcastRepository } from '../domain/PodcastRepository';
import { GetPodcastDetail } from './GetPodcastDetail';
import { GetTopPodcasts } from './GetTopPodcasts';
import type { PodcastCacheReader } from './ports/PodcastCacheReader';

export const createPodcastUseCases = (
  repository: PodcastRepository,
  cacheReader: PodcastCacheReader | null = null,
) => ({
  getTopPodcasts: new GetTopPodcasts(repository, cacheReader),
  getPodcastDetail: new GetPodcastDetail(repository, cacheReader),
});

export type PodcastUseCases = ReturnType<typeof createPodcastUseCases>;
