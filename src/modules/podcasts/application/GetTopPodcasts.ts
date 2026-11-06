import type { Podcast } from '../domain/Podcast';
import type { PodcastRepository } from '../domain/PodcastRepository';
import type { PodcastCacheReader } from './ports/PodcastCacheReader';

export class GetTopPodcasts {
  private readonly repository: PodcastRepository;
  private readonly cacheReader: PodcastCacheReader | null;

  constructor(repository: PodcastRepository, cacheReader: PodcastCacheReader | null = null) {
    this.repository = repository;
    this.cacheReader = cacheReader;
  }

  async execute(signal?: AbortSignal): Promise<Podcast[]> {
    return this.repository.getTopPodcasts(signal);
  }

  getCached(): Podcast[] | null {
    return this.cacheReader?.getTopPodcasts() ?? null;
  }
}
