import type { Podcast } from './Podcast';
import type { Episode } from './Episode';
import type { PodcastDetail } from './PodcastDetail';

export interface PodcastRepository {
  getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]>;
  getEpisodes(id: string, signal?: AbortSignal): Promise<Episode[]>;
  getPodcastDetail(id: string, signal?: AbortSignal): Promise<PodcastDetail>;
}
