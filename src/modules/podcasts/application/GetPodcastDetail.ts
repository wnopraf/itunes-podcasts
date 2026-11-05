import type { Podcast } from '../domain/Podcast';
import type { PodcastDetail } from '../domain/PodcastDetail';
import type { PodcastRepository } from '../domain/PodcastRepository';
import type { PodcastCacheReader } from './ports/PodcastCacheReader';

const withTopPodcastDescription = (
  detail: PodcastDetail,
  topPodcasts: Podcast[] | null,
): PodcastDetail => {
  const description = topPodcasts?.find(({ id }) => id === detail.podcast.id)?.description;
  return description ? { ...detail, podcast: { ...detail.podcast, description } } : detail;
};

export class GetPodcastDetail {
  private readonly repository: PodcastRepository;
  private readonly cacheReader: PodcastCacheReader | null;

  constructor(repository: PodcastRepository, cacheReader: PodcastCacheReader | null = null) {
    this.repository = repository;
    this.cacheReader = cacheReader;
  }

  async execute(podcastId: string, signal?: AbortSignal): Promise<PodcastDetail> {
    const [detail, topPodcasts] = await Promise.all([
      this.repository.getPodcastDetail(podcastId, signal),
      this.repository.getTopPodcasts(signal).catch(() => null),
    ]);
    return withTopPodcastDescription(detail, topPodcasts);
  }

  getCached(podcastId: string): PodcastDetail | null {
    const detail = this.cacheReader?.getPodcastDetail(podcastId);
    const topPodcasts = this.cacheReader?.getTopPodcasts();
    if (!detail || !topPodcasts) return null;
    return withTopPodcastDescription(detail, topPodcasts);
  }
}
