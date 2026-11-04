import type { CacheStore } from '@/shared/infrastructure/cache/CacheStore';
import type { PodcastCacheReader } from '../application/ports/PodcastCacheReader';
import type { Episode } from '../domain/Episode';
import type { Podcast } from '../domain/Podcast';
import type { PodcastDetail } from '../domain/PodcastDetail';

const CACHE_KEYS = {
  topPodcasts: 'podcasts:top',
  episodes: (podcastId: string) => `podcasts:${podcastId}:episodes`,
  podcastDetail: (podcastId: string) => `podcasts:${podcastId}:detail`,
};

type SerializedEpisode = Omit<Episode, 'pubDate'> & { pubDate: string };
type SerializedPodcastDetail = Omit<PodcastDetail, 'episodes'> & { episodes: SerializedEpisode[] };

const deserializeEpisode = (episode: SerializedEpisode): Episode => ({
  ...episode,
  pubDate: new Date(episode.pubDate),
});

export class PodcastCache implements PodcastCacheReader {
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

  getPodcastDetail(podcastId: string): PodcastDetail | null {
    const detail = this.cache.get<SerializedPodcastDetail>(CACHE_KEYS.podcastDetail(podcastId));
    return detail && { ...detail, episodes: detail.episodes.map(deserializeEpisode) };
  }

  setPodcastDetail(podcastId: string, detail: PodcastDetail): void {
    this.cache.set(CACHE_KEYS.podcastDetail(podcastId), detail, this.ttlMs);
  }
}
