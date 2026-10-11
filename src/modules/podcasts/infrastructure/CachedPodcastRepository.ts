import type { CacheStore } from '@/shared/infrastructure/cache/CacheStore';
import type { Episode } from '../domain/Episode';
import type { Podcast } from '../domain/Podcast';
import type { PodcastRepository } from '../domain/PodcastRepository';

const CACHE_KEYS = {
  topPodcasts: 'podcasts:top',
  episodes: (podcastId: string) => `podcasts:${podcastId}:episodes`,
};

type SerializedEpisode = Omit<Episode, 'pubDate'> & { pubDate: string };

const deserializeEpisode = (episode: SerializedEpisode): Episode => ({
  ...episode,
  pubDate: new Date(episode.pubDate),
});

export class CachedPodcastRepository implements PodcastRepository {
  private readonly repository: PodcastRepository;
  private readonly cache: CacheStore;
  private readonly ttlMs: number;

  constructor(repository: PodcastRepository, cache: CacheStore, ttlMs: number) {
    this.repository = repository;
    this.cache = cache;
    this.ttlMs = ttlMs;
  }

  async getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]> {
    const cached = this.cache.get<Podcast[]>(CACHE_KEYS.topPodcasts);
    if (cached) return cached;

    const podcasts = await this.repository.getTopPodcasts(signal);
    this.cache.set(CACHE_KEYS.topPodcasts, podcasts, this.ttlMs);
    return podcasts;
  }

  async getEpisodes(podcastId: string, signal?: AbortSignal): Promise<Episode[]> {
    const key = CACHE_KEYS.episodes(podcastId);
    const cached = this.cache.get<SerializedEpisode[]>(key);
    if (cached) return cached.map(deserializeEpisode);

    const episodes = await this.repository.getEpisodes(podcastId, signal);
    this.cache.set(key, episodes, this.ttlMs);
    return episodes;
  }
}
