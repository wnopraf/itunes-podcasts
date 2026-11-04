import type { Episode } from '../../domain/Episode';
import type { Podcast } from '../../domain/Podcast';
import type { PodcastDetail } from '../../domain/PodcastDetail';

export interface PodcastCacheReader {
  getTopPodcasts(): Podcast[] | null;
  getEpisodes(podcastId: string): Episode[] | null;
  getPodcastDetail(podcastId: string): PodcastDetail | null;
}
