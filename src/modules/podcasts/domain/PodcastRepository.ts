import type { Podcast } from './Podcast';
import type { PodcastDetail } from './PodcastDetail';

export interface PodcastRepository {
  getTopPodcasts(signal?: AbortSignal): Promise<Podcast[]>;
  getPodcastDetail(id: string, signal?: AbortSignal): Promise<PodcastDetail>;
}
