import type { Podcast } from '../../domain/Podcast';
import type { PodcastDetail } from '../../domain/PodcastDetail';

export interface PodcastCacheReader {
  getTopPodcasts(): Podcast[] | null;
  getPodcastDetail(podcastId: string): PodcastDetail | null;
}
