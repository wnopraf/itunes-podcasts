import type { Episode } from '../../domain/Episode';
import type { Podcast } from '../../domain/Podcast';

export interface PodcastCacheReader {
  getTopPodcasts(): Podcast[] | null;
  getEpisodes(podcastId: string): Episode[] | null;
}
