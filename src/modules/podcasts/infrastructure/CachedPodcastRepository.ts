import type { Episode } from '../domain/Episode';
import type { Podcast } from '../domain/Podcast';
import type { PodcastRepository } from '../domain/PodcastRepository';
import type { PodcastCache } from './PodcastCache';

export class CachedPodcastRepository implements PodcastRepository {
  private readonly repository: PodcastRepository;
  private readonly cache: PodcastCache;

  constructor(repository: PodcastRepository, cache: PodcastCache) {
    this.repository = repository;
    this.cache = cache;
  }

  async getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]> {
    const cached = this.cache.getTopPodcasts();
    if (cached) return cached;

    const podcasts = await this.repository.getTopPodcasts(signal);
    this.cache.setTopPodcasts(podcasts);
    return podcasts;
  }

  async getEpisodes(podcastId: string, signal?: AbortSignal): Promise<Episode[]> {
    const cached = this.cache.getEpisodes(podcastId);
    if (cached) return cached;

    const episodes = await this.repository.getEpisodes(podcastId, signal);
    this.cache.setEpisodes(podcastId, episodes);
    return episodes;
  }
}
