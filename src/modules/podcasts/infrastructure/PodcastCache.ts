import type { CacheStore } from '@/shared/infrastructure/cache/CacheStore';
import type { Episode } from '../domain/Episode';
import type { Podcast } from '../domain/Podcast';

const CACHE_KEYS = {
  topPodcasts: 'podcasts:top',
  episodes: (podcastId: string) => `podcasts:${podcastId}:episodes`,
};

type SerializedEpisode = Omit<Episode, 'pubDate'> & { pubDate: string };

const deserializeEpisode = (episode: SerializedEpisode): Episode => ({
  ...episode,
  pubDate: new Date(episode.pubDate),
});

export class PodcastCache {
  private readonly cache: CacheStore;
  private readonly ttlMs: number;

  constructor(cache: CacheStore, ttlMs: number) {
    this.cache = cache;
    this.ttlMs = ttlMs;
  }

  getTopPodcasts(): Podcast[] | null {
    return this.cache.get<Podcast[]>(CACHE_KEYS.topPodcasts);
  }

  setTopPodcasts(podcasts: Podcast[]): void {
    this.cache.set(CACHE_KEYS.topPodcasts, podcasts, this.ttlMs);
  }

  getEpisodes(podcastId: string): Episode[] | null {
    const episodes = this.cache.get<SerializedEpisode[]>(CACHE_KEYS.episodes(podcastId));
    return episodes?.map(deserializeEpisode) ?? null;
  }

  setEpisodes(podcastId: string, episodes: Episode[]): void {
    this.cache.set(CACHE_KEYS.episodes(podcastId), episodes, this.ttlMs);
  }
}
